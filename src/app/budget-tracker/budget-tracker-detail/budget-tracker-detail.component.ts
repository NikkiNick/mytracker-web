import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';
import { BudgetRecordType } from '../budget-record/budget-record-type.enum';
import { BudgetRecord } from '../budget-record/budget-record.model';
import { BudgetTracker } from '../budget-tracker.model';
import { BudgetTrackerService } from '../budget-tracker.service';

@Component({
  selector: 'app-budget-tracker-detail',
  templateUrl: './budget-tracker-detail.component.html',
  styleUrls: ['./budget-tracker-detail.component.scss']
})
export class BudgetTrackerDetailComponent {
  tracker: BudgetTracker;
  filteredRecords: BudgetRecord[];
  filteredIncome: BudgetRecord[];
  filteredExpenses: BudgetRecord[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BudgetTrackerService,
    private snackbarService: SnackBarService) {
    this.route.params.subscribe((p) => {
      const id: number = +p.id;
      this.service.getById(id).subscribe(
        (data: BudgetTracker) => {
          this.tracker = data;
          this.filteredIncome = data.records.filter((r) => r.type === BudgetRecordType.INCOME);
          this.filteredExpenses = data.records.filter((r) => r.type === BudgetRecordType.EXPENSE);
        },
        (err: HttpErrorResponse) => {
          this.snackbarService.showHttpError(err, $localize`:@@budgetTracker:Budget Tracker` + ' ');
          this.router.navigate(['/budget-trackers/overview']);
        }
      );
    });
  }

  setFilteredData(data: BudgetRecord[]) {
    this.filteredRecords = data;
  }
}
