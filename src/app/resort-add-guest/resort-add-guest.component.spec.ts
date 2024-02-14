import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortAddGuestComponent } from './resort-add-guest.component';

describe('ResortAddGuestComponent', () => {
  let component: ResortAddGuestComponent;
  let fixture: ComponentFixture<ResortAddGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResortAddGuestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResortAddGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
