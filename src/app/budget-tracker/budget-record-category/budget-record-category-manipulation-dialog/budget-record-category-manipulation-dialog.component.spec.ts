import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetRecordCategoryManipulationDialogComponent } from './budget-record-category-manipulation-dialog.component';

describe('BudgetRecordCategoryManipulationDialogComponent', () => {
  let component: BudgetRecordCategoryManipulationDialogComponent;
  let fixture: ComponentFixture<BudgetRecordCategoryManipulationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetRecordCategoryManipulationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetRecordCategoryManipulationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
