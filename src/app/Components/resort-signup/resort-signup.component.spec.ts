import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortSignupComponent } from './resort-signup.component';

describe('ResortSignupComponent', () => {
  let component: ResortSignupComponent;
  let fixture: ComponentFixture<ResortSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResortSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResortSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
