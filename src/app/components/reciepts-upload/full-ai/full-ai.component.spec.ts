import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullAiComponent } from './full-ai.component';

describe('FullAiComponent', () => {
  let component: FullAiComponent;
  let fixture: ComponentFixture<FullAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullAiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
