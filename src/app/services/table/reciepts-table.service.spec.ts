import { TestBed } from '@angular/core/testing';

import { RecieptsTableService } from './reciepts-table.service';

describe('RecieptsTableService', () => {
  let service: RecieptsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecieptsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
