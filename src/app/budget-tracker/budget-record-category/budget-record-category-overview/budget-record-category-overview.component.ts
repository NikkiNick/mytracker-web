import { Component } from '@angular/core';
import { BudgetRecordCategoryManipulationDialogComponent } from '../budget-record-category-manipulation-dialog/budget-record-category-manipulation-dialog.component';
import { BudgetRecordCategoryService } from '../budget-record-category.service';

@Component({
  selector: 'app-budget-record-category-overview',
  templateUrl: './budget-record-category-overview.component.html',
  styleUrls: ['./budget-record-category-overview.component.scss']
})
export class BudgetRecordCategoryOverviewComponent {
  manipulationDialog = BudgetRecordCategoryManipulationDialogComponent;

  constructor(public service: BudgetRecordCategoryService) {}
}
