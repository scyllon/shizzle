var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var cron = require('cron');
var _ = require('underscore-node');
var moment = require('moment');
var scheduler = require('./scheduler')
var imdb = require('node-movie');
var Scheduler = scheduler.Scheduler;

var job = new cron.CronJob({
  cronTime: '0 * * * *',
  onTick: function() {
    console.log('running a task every minute');

      Scheduler.pushData();
  },
  runOnInit: true
});

job.start();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/search/:name', (req, res, next) => {
  var name = req.params.name;
  var episode = req.params.episode;
  var torrentsite = 'https://pirateproxy.cc';
  var path = '/search/' + name + '/0/99/0';
  var url = torrentsite + path;
  path = encodeURI(path);
  console.log(path);
  parsePiratebay(url,function(data){
    data = data.slice(0,5);
    res.send(data);
  })
});

router.get('/top/movies', (req, res, next) => {
  var url = 'https://pirateproxy.cc/top/207';
  parsePiratebay(url,function(data){
    data.forEach(function(ele){
      var regex1 = /(.*?)[(]?\d{4}.*/g;
      var match = regex1.exec(ele.title);
      if(match!=undefined){
      var temp = match[1];

        var movie_title="";
        var regex2 = /(\w+)/g;
        while (match = regex2.exec(temp)) {
          movie_title += match[1] + ' ';
        }
        ele.movie_title = movie_title.trim();
        imdb(movie_title.trim(), function (err, data) {
            if(err){
              'failed'
            };
            console.log(data);
        });
      }
    })
    res.send(data);
  })
});

function parsePiratebay(url,callback){
  request(url, function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
    var $ = cheerio.load(body);
    var items = $('tbody tr', '#searchResult');
    var titels = [];
    items.each(function(i, elem) {
      var item = {};
      var title = $(this).find('.detLink').text();
      var magnet = $(this).find("a[title='Download this torrent using magnet']").attr('href');
      var vip = $(this).find("img[title='VIP']")
      var trusted = $(this).find("img[title='Trusted']")
      var SELE = $(this).find("td[align='right']");
      item.title = title;
      item.magnet = magnet;
      item.vip = (vip.length === 0) ? false : true;
      item.trusted = (trusted.length === 0) ? false : true;
      item.SE = SELE.first().text();
      item.LE = SELE.last().text();
      titels.push(item);
    });
    callback(titels);
  });
}

router.get('/new', (req, res) => {
  Scheduler.getData(function(result) {
    result.toArray(function(err, result) {
      var grouped = _.groupBy(result, function(episode) {
        return episode.airdate;
      });
      res.send(grouped);
    });
  })
});

module.exports = router;
