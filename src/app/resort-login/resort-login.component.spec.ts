import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortLoginComponent } from './resort-login.component';

describe('ResortLoginComponent', () => {
  let component: ResortLoginComponent;
  let fixture: ComponentFixture<ResortLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResortLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResortLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
