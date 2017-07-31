import { Component } from '@angular/core';
import { ScheduleService } from './services/schedule.service';
import { OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import {ExpandDigitPipe} from './pipes/expand-digit.pipe';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
