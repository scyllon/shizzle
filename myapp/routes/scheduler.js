var mongo = require('mongodb');
var request = require('request');
var _ = require('underscore-node');
var moment = require('moment');

exports.Scheduler = new function() {

  this.pushData = function() {
    var url = 'http://api.tvmaze.com/schedule/full';
    request(url, function(error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      var result = JSON.parse(body);
      var most_pop = _.filter(result, function(episode) {
        if (episode['_embedded']['show']['weight'] == 100) {
          var air_date = new Date(episode.airdate);
          var now = new Date();
          var diff = Math.abs(now - air_date);
          if (moment.duration(diff).asDays() < 7) {
            return true;
          }
        }
        return false;
      });
      var MongoClient = mongo.MongoClient;
      // Connect to the db
      MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
        if (err) {
          console.log("failed to connect");
        } else {
          var collection = db.collection('schedule')
          most_pop.forEach((ele) => {
            ele.airstamp = new Date(ele.airstamp)
            if(ele.summary){
              //Remove the <p></p> shit
              str = ele.summary;
              ele.summary = str.substring(3, str.length-4);
            }
            collection.update({
              'id': ele.id
            }, ele, {
              upsert: true
            }, function(err, result) {
              if (err) {
                console.log('fail');
              }
            });
          })
        }
      });
    });
  };

  this.getData = function(callback) {
    var MongoClient = mongo.MongoClient;
    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
      if (err) {
        console.log("failed to connect");
      } else {
        var collection = db.collection('schedule');
        var atleast = new Date();
        atleast.setDate(atleast.getDate() - 4);
        var max = new Date();
        max.setDate(max.getDate() + 2);
        console.log("Going to query");
        var result = collection.find({
          airstamp: {
            "$gte": atleast,
            "$lt": max
          }
        });
        callback(result);
      }
    });
  }
}
