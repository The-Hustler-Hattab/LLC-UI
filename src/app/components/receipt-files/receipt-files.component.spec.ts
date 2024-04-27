import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptFilesComponent } from './receipt-files.component';

describe('ReceiptFilesComponent', () => {
  let component: ReceiptFilesComponent;
  let fixture: ComponentFixture<ReceiptFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
