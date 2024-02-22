import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLayouttComponent } from './user-layoutt.component';

describe('UserLayouttComponent', () => {
  let component: UserLayouttComponent;
  let fixture: ComponentFixture<UserLayouttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserLayouttComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserLayouttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
