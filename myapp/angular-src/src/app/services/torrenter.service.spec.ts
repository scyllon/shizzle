import { TestBed, inject } from '@angular/core/testing';

import { TorrenterService } from './torrenter.service';

describe('TorrenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TorrenterService]
    });
  });

  it('should be created', inject([TorrenterService], (service: TorrenterService) => {
    expect(service).toBeTruthy();
  }));
});
