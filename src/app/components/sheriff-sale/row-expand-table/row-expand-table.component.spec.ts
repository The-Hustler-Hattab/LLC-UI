import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowExpandTableComponent } from './row-expand-table.component';

describe('RowExpandTableComponent', () => {
  let component: RowExpandTableComponent;
  let fixture: ComponentFixture<RowExpandTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowExpandTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RowExpandTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
