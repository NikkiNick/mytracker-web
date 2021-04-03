import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { Tracker } from 'src/app/tracker/tracker.model';
import { TrackerService } from 'src/app/tracker/tracker.service';
import { TrackerRecord } from '../tracker-record.model';
import { TrackerRecordService } from '../tracker-record.service';
import { TrackerRecordDTO } from '../tracker-recordDTO.model';

@Component({
    selector: 'app-tracker-record-add',
    templateUrl: './tracker-record-add.component.html',
    styleUrls: ['./tracker-record-add.component.scss']
})
export class TrackerRecordAddComponent implements OnInit {
  isEdit = false;
  currentRecord: TrackerRecord;
  form: FormGroup;
  trackers?: Tracker[];

  constructor(
    private router: Router,
    private recordService: TrackerRecordService,
    private trackerService: TrackerService,
    private snackbarService: SnackBarService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TrackerRecordAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { model?: TrackerRecord, navigateTo?: string, forEntity?: Tracker }
  ) {
      if (data.model !== null) {
          this.isEdit = true;
          this.currentRecord = data.model;
      } else {
          this.currentRecord = new TrackerRecord();
      }
      if(data.forEntity === null){
        this.trackerService.getAll().subscribe(
            (data) => this.trackers = data,
            (err) =>  this.snackbarService.showHttpError(err, 'Tracker ')
        );
      }
  }

  ngOnInit(): void {
      let trackerValidators: ValidatorFn[] = [];
      if(!this.data.forEntity){
        trackerValidators.push(Validators.required);
      }
      this.form = this.fb.group({
          selectedTracker: [null, trackerValidators],
          recordAmount: [this.currentRecord.amount, [ Validators.required ]]
      });
  }

  onSubmit() {
      if (this.form.valid) {
          this.currentRecord.amount = this.form.get('recordAmount').value;
          if (this.isEdit) {
              this.recordService.update(this.currentRecord).subscribe(
                  () => {
                      this.snackbarService.show('Record updated');
                      this.router.navigateByUrl(this.data.navigateTo);
                  },
                  (err) => this.snackbarService.showHttpError(err, 'Record ')
              );
          } else {
              let dto: TrackerRecordDTO;
              let selectedTracker: Tracker = this.form.get('selectedTracker').value;
              if(this.data.forEntity){  
                dto = TrackerRecordDTO.create(this.currentRecord, this.data.forEntity);
              } else {
                dto = TrackerRecordDTO.create(this.currentRecord, selectedTracker);
              }
              this.recordService.insert(dto).subscribe(
                  () => {
                      this.snackbarService.show('Record added');
                      this.router.navigateByUrl(`${this.data.navigateTo}${this.data.forEntity?'':selectedTracker.id}`);
                  },
                  (err) => this.snackbarService.showHttpError(err, 'Record ')
              );
          }
          this.closeDialog();
      }
  }

  closeDialog() {
      this.dialogRef.close();
  }

  compareFn: ((f1: Tracker, f2: Tracker) => boolean) | null = this.compareByValue;
  compareByValue(f1: Tracker, f2: Tracker) {
    return f1 && f2 && f1.id === f2.id;
}
}
