import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
import { TrackerService } from '../../tracker.service';
import { TrackerDTO } from '../../trackerDTO.model';

@Component({
  selector: 'app-record-panel',
  templateUrl: './record-panel.component.html',
  styleUrls: ['./record-panel.component.scss']
})
export class RecordPanelComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() filteredRecords: TrackerRecord[];
    @Input() tracker: Tracker;
    tableColumnsToDisplay = [ 'date', 'amount', 'diff', 'breakpoint', 'actions' ];
    tableDataSource: MatTableDataSource<TrackerRecord>;
    showContent = true;

    constructor(
      private dialog: MatDialog,
      private recordService: TrackerRecordService,
	  private trackerService: TrackerService,
      private snackbarService: SnackBarService,
      private router: Router) {}

    ngOnInit(): void {  
        //this.tableDataSource = new MatTableDataSource<TrackerRecord>(this.filteredRecords);
    }
    ngAfterViewInit(): void {
        this.filteredRecords.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
        this.tableDataSource = new MatTableDataSource<TrackerRecord>(this.filteredRecords);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.filteredRecords.currentValue !== changes.filteredRecords.previousValue) {
            this.filteredRecords.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
            this.tableDataSource = new MatTableDataSource<TrackerRecord>(this.filteredRecords);
        }
    }

    addRecord() {
        this.dialog.closeAll();
        this.dialog.open(TrackerRecordAddComponent, { data: { model: null, navigateTo: this.router.url, forEntity: this.tracker }});
    }

    editRecord(id: number) {
        this.dialog.closeAll();
        this.recordService.getById(id).subscribe(
            (res) => this.dialog.open(TrackerRecordAddComponent, { data: { model: res, navigateTo: this.router.url, forEntity: this.tracker } }),
            (err) => this.snackbarService.showHttpError(err, 'Record ')
        );
    }
    toggleContent() {
        this.showContent = !this.showContent;
    }

    deleteRecord(id: number) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { title: 'Please confirm', message: 'Are you sure you want to delete this Record?' } });
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.recordService.delete(id).subscribe(
                    () => {
                        this.snackbarService.show('Record deleted');
                        this.router.navigateByUrl(this.router.url);
                    },
                    (err) => this.snackbarService.showHttpError(err, 'Record '));
            }
        });
    }

    setBreakpoint(record: TrackerRecord) {
        if(this.tracker.breakpoint?.id === record.id){
            this.tracker.breakpoint = null;
        } else{
		    this.tracker.breakpoint = record;
        }
		this.trackerService.update(this.tracker).subscribe(
			() => {
				this.snackbarService.show(`Breakpoint ${this.tracker.breakpoint?"registered":"removed"}`);
				this.router.navigateByUrl(this.router.url);
			},
			(err) => this.snackbarService.showHttpError(err, 'Record ')
		);
    }

    calculatePercentOnTotal(record: TrackerRecord){
        return "ok";
    }

}
