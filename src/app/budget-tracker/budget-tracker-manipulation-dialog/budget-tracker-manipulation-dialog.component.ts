import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManipulationDialogData } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog-data.model';
import { ManipulationDialogComponent } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog.component';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';
import { UnitType } from 'src/app/unittype/unit-type.model';
import { BudgetTracker } from '../budget-tracker.model';
import { BudgetTrackerService } from '../budget-tracker.service';

@Component({
  selector: 'app-budget-tracker-manipulation-dialog',
  templateUrl: './budget-tracker-manipulation-dialog.component.html',
  styleUrls: ['./budget-tracker-manipulation-dialog.component.scss']
})
export class BudgetTrackerManipulationDialogComponent extends ManipulationDialogComponent<BudgetTracker> {

  constructor(
      public router: Router,
      public trackerService: BudgetTrackerService,
      public snackbarService: SnackBarService,
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<BudgetTrackerManipulationDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ManipulationDialogData) {
      super(router, snackbarService, dialogRef, data);
      this.form = this.fb.group({
          trackerName: [, [ Validators.required ]],
          trackerColor: [ ],
          trackerCurrency: [, [ Validators.required ]]
      });
  }

  form: FormGroup;

  ngOnInit(): void {

  }
}
