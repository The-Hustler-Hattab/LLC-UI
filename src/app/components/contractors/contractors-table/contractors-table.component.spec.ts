import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorsTableComponent } from './contractors-table.component';

describe('ContractorsTableComponent', () => {
  let component: ContractorsTableComponent;
  let fixture: ComponentFixture<ContractorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractorsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
