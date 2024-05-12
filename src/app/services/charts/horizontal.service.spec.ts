import { TestBed } from '@angular/core/testing';

import { HorizontalService } from './horizontal.service';

describe('HorizontalService', () => {
  let service: HorizontalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorizontalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
