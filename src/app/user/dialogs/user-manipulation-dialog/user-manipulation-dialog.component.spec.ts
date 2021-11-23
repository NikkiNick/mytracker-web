import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManipulationDialogComponent } from './user-manipulation-dialog.component';

describe('UserManipulationDialogComponent', () => {
  let component: UserManipulationDialogComponent;
  let fixture: ComponentFixture<UserManipulationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManipulationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManipulationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
