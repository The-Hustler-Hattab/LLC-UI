import { TestBed } from '@angular/core/testing';

import { SheriffSaleService } from './sheriff-sale.service';

describe('SheriffSaleService', () => {
  let service: SheriffSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheriffSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
