import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TorrenterService } from '../../services/torrenter.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-torrent-search',
  templateUrl: './torrent-search.component.html',
  styleUrls: ['./torrent-search.component.css']
})
export class TorrentSearchComponent implements OnInit, OnChanges {
  @Input() torrent: any;
  data: any= [];
  constructor(private torrenterService: TorrenterService, private sanitizer:DomSanitizer) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.torrent.currentValue!=undefined){
      this.torrenterService.getTorrents(changes.torrent.currentValue).then(data => {this.data = data;});
    }
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

}
