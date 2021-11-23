import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManipulationDialogData } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog-data.model';
import { ManipulationDialogComponent } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog.component';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';
import { UnitType } from '../unit-type.model';
import { UnitTypeService } from '../unit-type.service';

@Component({
  selector: 'app-unit-type-manipulation-dialog',
  templateUrl: './unit-type-manipulation-dialog.component.html',
  styleUrls: ['./unit-type-manipulation-dialog.component.scss']
})
export class UnitTypeManipulationDialogComponent extends ManipulationDialogComponent<UnitType> {
  form: FormGroup;

  constructor(
    public router: Router,
    public service: UnitTypeService,
    public snackbarService: SnackBarService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UnitTypeManipulationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ManipulationDialogData) {
    super(router, snackbarService, dialogRef, data);
    this.form = this.fb.group({
      unitType_shortName: [, [ Validators.required ]],
      unitType_longName: [, [ Validators.required ]]
    });
  }

  confirm(): void {
    alert('lol');
  }
}
