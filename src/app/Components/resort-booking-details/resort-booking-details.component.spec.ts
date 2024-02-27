import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortBookingDetailsComponent } from './resort-booking-details.component';

describe('ResortBookingDetailsComponent', () => {
  let component: ResortBookingDetailsComponent;
  let fixture: ComponentFixture<ResortBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResortBookingDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResortBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
