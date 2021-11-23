import { Component } from '@angular/core';
import { BudgetTrackerManipulationDialogComponent } from '../budget-tracker-manipulation-dialog/budget-tracker-manipulation-dialog.component';
import { BudgetTrackerService } from '../budget-tracker.service';

@Component({
  selector: 'app-budget-tracker-overview',
  templateUrl: './budget-tracker-overview.component.html',
  styleUrls: ['./budget-tracker-overview.component.scss']
})
export class BudgetTrackerOverviewComponent {
  manipulationDialog = BudgetTrackerManipulationDialogComponent;

  constructor(public service: BudgetTrackerService) { }
}
