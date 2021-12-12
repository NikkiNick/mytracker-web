import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManipulationDialogData } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog-data.model';
import { ManipulationDialogComponent } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog.component';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';
import { BudgetRecordCategory } from '../budget-record-category.model';
import { BudgetRecordCategoryService } from '../budget-record-category.service';

@Component({
  selector: 'app-budget-record-category-manipulation-dialog',
  templateUrl: './budget-record-category-manipulation-dialog.component.html',
  styleUrls: ['./budget-record-category-manipulation-dialog.component.scss']
})
export class BudgetRecordCategoryManipulationDialogComponent extends ManipulationDialogComponent<BudgetRecordCategory> {
  form: FormGroup;

  constructor(
    public router: Router,
    public service: BudgetRecordCategoryService,
    public snackbarService: SnackBarService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BudgetRecordCategoryManipulationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ManipulationDialogData) {
    super(router, snackbarService, dialogRef, data);
    this.form = this.fb.group({
      recordCategory_name: [, [ Validators.required ]],
      recordCategory_description: [ ],
      recordCategory_color: [, [ Validators.required ]]
    });
  }
}
