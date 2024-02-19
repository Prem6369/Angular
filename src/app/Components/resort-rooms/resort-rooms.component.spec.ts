import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortRoomsComponent } from './resort-rooms.component';

describe('ResortRoomsComponent', () => {
  let component: ResortRoomsComponent;
  let fixture: ComponentFixture<ResortRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResortRoomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResortRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
