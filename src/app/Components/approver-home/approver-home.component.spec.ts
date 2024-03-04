import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverHomeComponent } from './approver-home.component';

describe('ApproverHomeComponent', () => {
  let component: ApproverHomeComponent;
  let fixture: ComponentFixture<ApproverHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproverHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproverHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
