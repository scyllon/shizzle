import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule }    from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule,MdListModule,MdTabsModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import { TorrentSearchComponent } from './components/torrent-search/torrent-search.component';
import {MdIconModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ScheduleService } from './services/schedule.service';
import {KeysPipe} from './pipes/keys.pipe';
import {ExpandDigitPipe} from './pipes/expand-digit.pipe';
import { TorrenterService } from './services/torrenter.service';
import { SchedularComponent } from './components/schedular/schedular.component';
import { TopMoviesComponent } from './components/top-movies/top-movies.component';

const appRoutes: Routes = [

  {
    path: 'top/movies',
    component: TopMoviesComponent
  },
  {
    path: 'schedule',
    component: SchedularComponent
  },
  { path: '',
    redirectTo: '/schedule',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    KeysPipe,
    ExpandDigitPipe,
    TorrentSearchComponent,
    SchedularComponent,
    TopMoviesComponent
  ],
  imports: [
    BrowserModule, HttpModule,BrowserAnimationsModule,
    MdButtonModule, MdCheckboxModule,MdListModule,
    MdTabsModule, MdCardModule, MdMenuModule,
    MdIconModule, MdInputModule, FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ScheduleService,TorrenterService,KeysPipe,ExpandDigitPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
