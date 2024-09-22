import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheriffSaleComponent } from './sheriff-sale.component';

describe('SheriffSaleComponent', () => {
  let component: SheriffSaleComponent;
  let fixture: ComponentFixture<SheriffSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheriffSaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SheriffSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
