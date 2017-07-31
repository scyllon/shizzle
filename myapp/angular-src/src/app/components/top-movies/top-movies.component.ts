import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css']
})
export class TopMoviesComponent implements OnInit {
  data: any;

  constructor(private scheduleService: ScheduleService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.scheduleService.getTopMovies().then((data) => { this.data = data });
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
