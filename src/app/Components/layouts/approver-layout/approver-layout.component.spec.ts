import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverLayoutComponent } from './approver-layout.component';

describe('ApproverLayoutComponent', () => {
  let component: ApproverLayoutComponent;
  let fixture: ComponentFixture<ApproverLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproverLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproverLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
