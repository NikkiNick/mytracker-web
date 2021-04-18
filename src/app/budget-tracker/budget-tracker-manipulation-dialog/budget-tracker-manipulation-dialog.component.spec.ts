import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTrackerManipulationDialogComponent } from './budget-tracker-manipulation-dialog.component';

describe('BudgetTrackerManipulationDialogComponent', () => {
  let component: BudgetTrackerManipulationDialogComponent;
  let fixture: ComponentFixture<BudgetTrackerManipulationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetTrackerManipulationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetTrackerManipulationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
