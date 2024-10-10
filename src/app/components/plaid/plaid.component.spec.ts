import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaidComponent } from './plaid.component';

describe('PlaidComponent', () => {
  let component: PlaidComponent;
  let fixture: ComponentFixture<PlaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
