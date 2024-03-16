import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPreviewComponent } from './booking-preview.component';

describe('BookingPreviewComponent', () => {
  let component: BookingPreviewComponent;
  let fixture: ComponentFixture<BookingPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
