import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { UnitType } from 'src/app/unittype/unit-type.model';
import { UnitTypeService } from 'src/app/unittype/unit-type.service';
import { Tracker } from '../tracker.model';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-tracker-add',
  templateUrl: './tracker-add.component.html',
  styleUrls: ['./tracker-add.component.scss']
})
export class TrackerAddComponent implements OnInit {

  isEdit: Boolean = false;
  currentTracker: Tracker;
  unitTypes: UnitType[];
  form: FormGroup;

  constructor(
    private router: Router,
    private trackerService: TrackerService,
    private unitTypeService: UnitTypeService,
    private snackbarService: SnackBarService,
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<TrackerAddComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { model?: Tracker, navigateTo?: string }) {
      if(data.model !== null){
        this.isEdit = true;
        this.currentTracker = data.model;
      }else{
        this.currentTracker = new Tracker();
      }
  }

  ngOnInit(): void {
    this.unitTypeService.getAll().subscribe(
      data => this.unitTypes = data,
      (error: HttpErrorResponse) => this.snackbarService.show(error.message)
    );
    this.form = this.fb.group({
      trackerName: [this.currentTracker.name, [ Validators.required ]],
      trackerUnitType: [this.currentTracker.unitType, [ Validators.required ]],
      trackerColor: [this.currentTracker.color],
      trackerRecordLength: [this.currentTracker.recordLength, [ Validators.required, Validators.min(1), Validators.max(8) ]],
      trackerRecordPrecision: [this.currentTracker.recordPrecision, [ Validators.required, Validators.min(0), Validators.max(6) ]]
    });
  }

  onSubmit(){
    if(this.form.valid){
      this.currentTracker.name = this.form.get("trackerName").value;
      this.currentTracker.unitType = this.form.get("trackerUnitType").value;
      this.currentTracker.color = this.form.get("trackerColor").value;
      this.currentTracker.recordLength = this.form.get("trackerRecordLength").value;
      this.currentTracker.recordPrecision = this.form.get("trackerRecordPrecision").value;
      if(this.isEdit){
        this.trackerService.update(this.currentTracker).subscribe(
          () => this.snackbarService.show("Tracker updated"),
          err => this.snackbarService.showHttpError(err, "Tracker ")
        );
      } else{
        this.trackerService.insert(this.currentTracker).subscribe(
          () => this.snackbarService.show("Tracker added"),
          err => this.snackbarService.showHttpError(err, "Tracker ")
        )
      }
      this.router.navigateByUrl(this.data.navigateTo);
      this.closeDialog();
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

  compareFn: ((f1: UnitType, f2: UnitType) => boolean) | null = this.compareByValue;

  compareByValue(f1: UnitType, f2: UnitType) { 
    return f1 && f2 && f1.id === f2.id; 
  }

}
