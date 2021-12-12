import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetRecordManipulationDialogComponent } from './budget-record-manipulation-dialog.component';

describe('BudgetRecordManipulationDialogComponent', () => {
  let component: BudgetRecordManipulationDialogComponent;
  let fixture: ComponentFixture<BudgetRecordManipulationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetRecordManipulationDialogComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetRecordManipulationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
