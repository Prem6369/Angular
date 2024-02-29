import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertResortDetailsComponent } from './insert-resort-details.component';

describe('InsertResortDetailsComponent', () => {
  let component: InsertResortDetailsComponent;
  let fixture: ComponentFixture<InsertResortDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertResortDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertResortDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
