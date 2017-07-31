import { Component } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import {ExpandDigitPipe} from '../../pipes/expand-digit.pipe';
import * as moment from 'moment';

@Component({
  selector: 'app-schedular',
  templateUrl: './schedular.component.html',
  styleUrls: ['./schedular.component.css']
})
export class SchedularComponent implements OnInit {

  title = 'app';
  data: any;
  toSearch: String;
  scheduleService: ScheduleService;
  temp_search: any;

  constructor(private _scheduleService: ScheduleService, private expandDigitPipe: ExpandDigitPipe) {
    this.scheduleService = _scheduleService;
  }

  ngOnInit(): void {
    this.scheduleService.getSchedule().then((data) => {this.data = data});
  }

  countDown(date : any){
    var air : any = new Date(date);
    var now : any= new Date();
    var diff = air - now;
    return moment.duration(diff).humanize(true);
  }

  newEpisodeSearch(torrentName : String,torrentSeason: any,torrentEpisode: any){
    this.toSearch = torrentName + ' s'+this.expandDigitPipe.transform(torrentSeason, null) + 'e' + this.expandDigitPipe.transform(torrentEpisode, null);
    console.log(this.toSearch)
  }

  newSearch(){
    this.toSearch = this.temp_search;
  }
}
