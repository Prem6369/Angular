import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResortDetailsComponent } from './update-resort-details.component';

describe('UpdateResortDetailsComponent', () => {
  let component: UpdateResortDetailsComponent;
  let fixture: ComponentFixture<UpdateResortDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateResortDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateResortDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
