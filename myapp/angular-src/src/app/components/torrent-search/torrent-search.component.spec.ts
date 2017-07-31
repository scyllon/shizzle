import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentSearchComponent } from './torrent-search.component';

describe('TorrentSearchComponent', () => {
  let component: TorrentSearchComponent;
  let fixture: ComponentFixture<TorrentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorrentSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorrentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
