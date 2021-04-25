import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ManipulationDialogData } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog-data.model';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';
import { BudgetRecordManipulationDialogComponent } from '../budget-record/budget-record-manipulation-dialog/budget-record-manipulation-dialog.component';
import { BudgetRecordType } from '../budget-record/budget-record-type.enum';
import { BudgetRecord } from '../budget-record/budget-record.model';
import { BudgetTracker } from '../budget-tracker.model';
import { BudgetTrackerService } from '../budget-tracker.service';

@Component({
  selector: 'app-budget-tracker-detail',
  templateUrl: './budget-tracker-detail.component.html',
  styleUrls: ['./budget-tracker-detail.component.scss']
})
export class BudgetTrackerDetailComponent implements OnInit {

  tracker: BudgetTracker;
  filteredRecords: BudgetRecord[];
  filteredIncome: BudgetRecord[];
  filteredExpenses: BudgetRecord[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BudgetTrackerService,
    private snackbarService: SnackBarService,
    private dialog: MatDialog) {

    this.route.params.subscribe(p => {
      const id: number = +p.id;
      this.service.getById(id).subscribe(
        (data: BudgetTracker) => {
          this.tracker = data;
          this.filteredIncome = data.records.filter(r => r.type === BudgetRecordType.INCOME);
          this.filteredExpenses = data.records.filter(r => r.type === BudgetRecordType.EXPENSE);
        },
        (err: HttpErrorResponse) => {
          this.snackbarService.showHttpError(err, $localize`:@@budgetTracker:Budget Tracker` + ' ');
          this.router.navigate(['/budget-trackers/overview']);
        }
      );
    });
  }

  ngOnInit(): void {
  }
  setFilteredData(data: BudgetRecord[]) {
    this.filteredRecords = data;
  }
}
