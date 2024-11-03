import { TestBed } from '@angular/core/testing';

import { ManageBankService } from './manage.service';

describe('ManageService', () => {
  let service: ManageBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
