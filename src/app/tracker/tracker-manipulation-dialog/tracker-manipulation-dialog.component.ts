import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManipulationDialogData } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog-data.model';
import { ManipulationDialogComponent } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog.component';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';
import { UnitType } from 'src/app/unittype/unit-type.model';
import { UnitTypeService } from 'src/app/unittype/unit-type.service';
import { Tracker } from '../tracker.model';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-tracker-manipulation-dialog',
  templateUrl: './tracker-manipulation-dialog.component.html',
  styleUrls: ['./tracker-manipulation-dialog.component.scss']
})
export class TrackerManipulationDialogComponent extends ManipulationDialogComponent<Tracker> {

  unitTypes: UnitType[];
  form: FormGroup;

  constructor(
    public router : Router,
    public trackerService: TrackerService,
    private unitTypeService: UnitTypeService,
    public snackbarService: SnackBarService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TrackerManipulationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ManipulationDialogData) {
      super(router, snackbarService,dialogRef, data);
      this.form = this.fb.group({
        trackerName: [, [ Validators.required ]],
        trackerUnitType: [, [ Validators.required ]],
        trackerColor: [ ],
        trackerRecordPrecision: [, [ Validators.required, Validators.min(0), Validators.max(6) ]]
      });
  }

ngOnInit(): void {
    // Get all available unittypes
    this.unitTypeService.getAll().subscribe(
        (data) => this.unitTypes = data,
        (error: HttpErrorResponse) => this.snackbarService.show(error.message)
    );
}

// onSubmit() {
//     if (this.form.valid) {
//         this.currentTracker.name = this.form.get('trackerName').value;
//         this.currentTracker.unitType = this.form.get('trackerUnitType').value;
//         this.currentTracker.color = this.form.get('trackerColor').value;
//         this.currentTracker.recordPrecision = this.form.get('trackerRecordPrecision').value;
//         if (this.isEdit) {
//             this.trackerService.update(this.currentTracker as Tracker).subscribe(
//                 () => {
//                     this.snackbarService.show($localize`:@@tracker-updated:Tracker updated`);
//                     this.router.navigateByUrl(this.data.navigateTo);
//                 },
//                 (err) => this.snackbarService.showHttpError(err, $localize`:@@tracker:Tracker`+' ')
//             );
//         } else {
//             this.trackerService.insert(this.currentTracker).subscribe(
//                 () => {
//                     this.snackbarService.show($localize`:@@tracker-added:Tracker added`);
//                     this.router.navigateByUrl(this.data.navigateTo);
//                 },
//                 (err) => this.snackbarService.showHttpError(err, $localize`:@@tracker:Tracker`+' ')
//             );
//         }
//         this.closeDialog();
//     }
// }

compareFn: ((f1: UnitType, f2: UnitType) => boolean) | null = this.compareByValue;
compareByValue(f1: UnitType, f2: UnitType) {
    return f1 && f2 && f1.id === f2.id;
}
}
