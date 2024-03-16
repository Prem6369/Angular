import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeApproverComponent } from './change-approver.component';

describe('ChangeApproverComponent', () => {
  let component: ChangeApproverComponent;
  let fixture: ComponentFixture<ChangeApproverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeApproverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
