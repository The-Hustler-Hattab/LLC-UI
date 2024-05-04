import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieptsTableComponent } from './reciepts-table.component';

describe('RecieptsTableComponent', () => {
  let component: RecieptsTableComponent;
  let fixture: ComponentFixture<RecieptsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecieptsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecieptsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
