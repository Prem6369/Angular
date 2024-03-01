import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortDetailsPreviewComponent } from './resort-details-preview.component';

describe('ResortDetailsPreviewComponent', () => {
  let component: ResortDetailsPreviewComponent;
  let fixture: ComponentFixture<ResortDetailsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResortDetailsPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResortDetailsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
