import { TestBed } from '@angular/core/testing';

import { IncomeApiServiceService } from './income-api-service.service';

describe('IncomeApiServiceService', () => {
  let service: IncomeApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
