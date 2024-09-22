import { TestBed } from '@angular/core/testing';

import { SheriffSaleApiService } from './sheriff-sale-api.service';

describe('SheriffSaleApiService', () => {
  let service: SheriffSaleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheriffSaleApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
