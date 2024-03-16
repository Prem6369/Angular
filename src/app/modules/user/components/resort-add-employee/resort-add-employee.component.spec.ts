import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortAddEmployeeComponent } from './resort-add-employee.component';

describe('ResortAddEmployeeComponent', () => {
  let component: ResortAddEmployeeComponent;
  let fixture: ComponentFixture<ResortAddEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResortAddEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResortAddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
