import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortThankyouComponent } from './resort-thankyou.component';

describe('ResortThankyouComponent', () => {
  let component: ResortThankyouComponent;
  let fixture: ComponentFixture<ResortThankyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResortThankyouComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResortThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
