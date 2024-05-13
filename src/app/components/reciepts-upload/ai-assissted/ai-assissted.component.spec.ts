import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAssisstedComponent } from './ai-assissted.component';

describe('AiAssisstedComponent', () => {
  let component: AiAssisstedComponent;
  let fixture: ComponentFixture<AiAssisstedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiAssisstedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiAssisstedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
