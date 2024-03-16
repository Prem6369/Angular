import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBookingStatusComponent } from './manage-booking-status.component';

describe('ManageBookingStatusComponent', () => {
  let component: ManageBookingStatusComponent;
  let fixture: ComponentFixture<ManageBookingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageBookingStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageBookingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
