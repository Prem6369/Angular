import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookingDetailsComponent } from './update-booking-details.component';

describe('UpdateBookingDetailsComponent', () => {
  let component: UpdateBookingDetailsComponent;
  let fixture: ComponentFixture<UpdateBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBookingDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
