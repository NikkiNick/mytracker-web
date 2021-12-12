import { AfterContentChecked, Component, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManipulationDialogData } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog-data.model';
import { ManipulationDialogComponent } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog.component';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';
import { BudgetRecordCategoryManipulationDialogComponent } from '../../budget-record-category/budget-record-category-manipulation-dialog/budget-record-category-manipulation-dialog.component';
import { BudgetRecordCategory } from '../../budget-record-category/budget-record-category.model';
import { BudgetRecordCategoryService } from '../../budget-record-category/budget-record-category.service';
import { BudgetRecordType } from '../budget-record-type.enum';
import { BudgetRecord } from '../budget-record.model';
import { BudgetRecordService } from '../budget-record.service';

@Component({
  selector: 'app-budget-record-manipulation-dialog',
  templateUrl: './budget-record-manipulation-dialog.component.html',
  styleUrls: ['./budget-record-manipulation-dialog.component.scss']
})
export class BudgetRecordManipulationDialogComponent extends ManipulationDialogComponent<BudgetRecord> implements AfterContentChecked {
  constructor(
      public router: Router,
      public recordService: BudgetRecordService,
      public recordCategoryService: BudgetRecordCategoryService,
      public snackbarService: SnackBarService,
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<BudgetRecordManipulationDialogComponent>,
      private dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: ManipulationDialogData) {
    super(router, snackbarService, dialogRef, data);
    this.form = this.fb.group({
      recordName: [, [ Validators.required ]],
      recordDescription: [, [ ]],
      recordDate: [ ],
      recordType: [, [ Validators.required ]],
      recordCategory: [, [ Validators.required ] ],
      recordAmount: [, [Validators.required, ]]
    });
    this.loadCategories();
  }

  recordCategories: BudgetRecordCategory[];
  recordType = BudgetRecordType;
  recordTypes: any[];

  form: FormGroup;

  ngAfterContentChecked(): void {
    if (!this.isEdit) {
      this.model.value.date = new Date();
    }
    this.recordTypes = Object.values(this.recordType).filter((k) => isNaN(Number(k)));
  }
  addNewCategory(): void {
    const result = this.dialog.open(BudgetRecordCategoryManipulationDialogComponent, { data: { }  as unknown as ManipulationDialogData});
    result.afterClosed().subscribe(
      (res) => {
        this.loadCategories();
        this.model.getValue().category = res;
      }
    );
  }
  private loadCategories(): void {
    this.recordCategoryService.getAll().subscribe(
      (categories) => this.recordCategories = categories,
      (err) => this.snackbarService.showHttpError(err, $localize`:@@recordCategory:RecordCategory `)
    );
  }
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  compareFnCategory: ((f1: BudgetRecordCategory, f2: BudgetRecordCategory) => boolean) | null = this.compareByValueCategory;

  compareByValue(f1: any, f2: any): boolean {
    return f1 && f2 && f1 === f2;
  }
  compareByValueCategory(f1: BudgetRecordCategory, f2: BudgetRecordCategory): boolean {
    return f1 && f2 && f1.id === f2.id;
  }
}
