import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieptsUploadComponent } from './reciepts-upload.component';

describe('RecieptsUploadComponent', () => {
  let component: RecieptsUploadComponent;
  let fixture: ComponentFixture<RecieptsUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecieptsUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecieptsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
