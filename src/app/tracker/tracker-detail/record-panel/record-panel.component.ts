import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { compareAsc, compareDesc } from 'date-fns';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { TrackerRecordAddComponent } from 'src/app/tracker-record/tracker-record-add/tracker-record-add.component';
import { TrackerRecord } from 'src/app/tracker-record/tracker-record.model';
import { TrackerRecordService } from 'src/app/tracker-record/tracker-record.service';
import { Tracker } from '../../tracker.model';

@Component({
  selector: 'app-record-panel',
  templateUrl: './record-panel.component.html',
  styleUrls: ['./record-panel.component.scss']
})
export class RecordPanelComponent implements OnInit, OnChanges {

  @Input() tracker: Tracker;
  @Input() filteredRecords: TrackerRecord[];
  tableColumnsToDisplay = [ 'date', 'amount', 'actions' ];
  tableDataSource: MatTableDataSource<TrackerRecord>;

  constructor(
    private dialog: MatDialog,
    private recordService: TrackerRecordService,
    private snackbarService: SnackBarService,
    private router: Router) { 
  
  }

  ngOnInit(): void {
    this.tableDataSource = new MatTableDataSource<TrackerRecord>(this.tracker.records.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))));
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.filteredRecords.currentValue !== changes.filteredRecords.previousValue){
      this.tableDataSource.data = this.filteredRecords;
    }
  }

  addRecord(){
    this.dialog.closeAll();
    this.dialog.open(TrackerRecordAddComponent, { data: { model: null, navigateTo: this.router.url, forEntity: this.tracker }});
  }

  editRecord(id: number){
    this.dialog.closeAll();
    this.recordService.getById(id).subscribe(
      res => this.dialog.open(TrackerRecordAddComponent, { data: { model: res, navigateTo: this.router.url, forEntity: this.tracker } }),
      err => this.snackbarService.showHttpError(err, "Record ")
    );
  }

  deleteRecord(id: number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { title: "Please confirm", message: "Are you sure you want to delete this Record?" } });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.recordService.delete(id).subscribe(
          () => {
            this.snackbarService.show("Record deleted");
            this.router.navigateByUrl(this.router.url);
          },
          err => this.snackbarService.showHttpError(err, "Record "));
      }
    })
  }

}
