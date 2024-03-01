import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverHeaderComponent } from './approver-header.component';

describe('ApproverHeaderComponent', () => {
  let component: ApproverHeaderComponent;
  let fixture: ComponentFixture<ApproverHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproverHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproverHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
