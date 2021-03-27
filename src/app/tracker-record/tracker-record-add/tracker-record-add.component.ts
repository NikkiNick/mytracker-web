import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { Tracker } from 'src/app/tracker/tracker.model';
import { TrackerRecord } from '../tracker-record.model';
import { TrackerRecordService } from '../tracker-record.service';
import { TrackerRecordDTO } from '../tracker-recordDTO.model';

@Component({
  selector: 'app-tracker-record-add',
  templateUrl: './tracker-record-add.component.html',
  styleUrls: ['./tracker-record-add.component.scss']
})
export class TrackerRecordAddComponent implements OnInit {

  isEdit: Boolean = false;
  currentRecord: TrackerRecord;
  form: FormGroup;

  constructor(
    private router: Router,
    private recordService: TrackerRecordService,
    private snackbarService: SnackBarService,
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<TrackerRecordAddComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { model?: TrackerRecord, navigateTo?: string, forEntity?: Tracker }
  ) { 
    if(data.model !== null){
      this.isEdit = true;
      this.currentRecord = data.model;
    }else{
      this.currentRecord = new TrackerRecord();
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      recordAmount: [this.currentRecord.amount, [ Validators.required ]]
    });
  }

  onSubmit(){
    if(this.form.valid){
      this.currentRecord.amount = this.form.get("recordAmount").value;
      if(this.isEdit){
        this.recordService.update(this.currentRecord).subscribe(
          () => {
            this.snackbarService.show("Record updated");
            this.router.navigateByUrl(this.data.navigateTo);
          },
          err => this.snackbarService.showHttpError(err, "Record ")
        );
      } else{
        let dto = TrackerRecordDTO.create(this.currentRecord, this.data.forEntity);
        this.recordService.insert(dto).subscribe(
          () => {
            this.snackbarService.show("Record added");
            this.router.navigateByUrl(this.data.navigateTo);
          },
          err => this.snackbarService.showHttpError(err, "Record ")
        )
      }
      this.closeDialog();
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
