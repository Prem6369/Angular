import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverProfileComponent } from './approver-profile.component';

describe('ApproverProfileComponent', () => {
  let component: ApproverProfileComponent;
  let fixture: ComponentFixture<ApproverProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproverProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproverProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
