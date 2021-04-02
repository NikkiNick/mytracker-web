import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { UnitType } from '../unit-type.model';
import { UnitTypeService } from '../unit-type.service';

@Component({
    selector: 'app-unit-type-add',
    templateUrl: './unit-type-add.component.html',
    styleUrls: ['./unit-type-add.component.scss']
})
export class UnitTypeAddComponent implements OnInit {
    isEdit = false;
    currentUnitType: UnitType;
    form: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private unitTypeService: UnitTypeService,
        private snackbarService: SnackBarService,
        public dialogRef: MatDialogRef<UnitTypeAddComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data.model) {
            this.isEdit = true;
            this.currentUnitType = data.model;
        } else {
            this.currentUnitType = new UnitType();
        }
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            unitType_shortName: [ this.currentUnitType.shortName, [ Validators.required ] ],
            unitType_longName: [ this.currentUnitType.longName, [ Validators.required ] ]
        });
    }

    onSubmit() {
        if (this.form.valid) {
            this.currentUnitType.shortName = this.form.get('unitType_shortName').value;
            this.currentUnitType.longName = this.form.get('unitType_longName').value;
            if (this.isEdit) {
                this.unitTypeService.update(this.currentUnitType).subscribe(
                    () => this.snackbarService.show('UnitType updated'),
                    (err) => this.snackbarService.showHttpError(err, 'UnitType ')
                );
            } else {
                this.unitTypeService.insert(this.currentUnitType).subscribe(
                    () => this.snackbarService.show('UnitType added'),
                    (err) => this.snackbarService.showHttpError(err, 'UnitType ')
                );
            }
            this.router.navigate(['/unittypes', 'overview']);
            this.closeDialog();
        }
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
