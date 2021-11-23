import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { compareDesc } from 'date-fns';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';
import { TrackerRecordAddComponent } from 'src/app/tracker-record/tracker-record-add/tracker-record-add.component';
import { TrackerRecord } from 'src/app/tracker-record/tracker-record.model';
import { TrackerRecordService } from 'src/app/tracker-record/tracker-record.service';
import { Tracker } from '../../tracker.model';
import { TrackerService } from '../../tracker.service';

@Component({
  selector: 'app-record-panel',
  templateUrl: './record-panel.component.html',
  styleUrls: ['./record-panel.component.scss']
})
export class RecordPanelComponent implements OnChanges, AfterViewInit {
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

    ngAfterViewInit(): void {
      this.filteredRecords.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
      this.tableDataSource = new MatTableDataSource<TrackerRecord>(this.filteredRecords);
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes.filteredRecords.currentValue !== changes.filteredRecords.previousValue) {
        this.filteredRecords.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
        this.tableDataSource = new MatTableDataSource<TrackerRecord>(this.filteredRecords);
      }
    }

    addRecord(): void {
      this.dialog.closeAll();
      this.dialog.open(TrackerRecordAddComponent, { data: { model: null, navigateTo: this.router.url, forEntity: this.tracker } });
    }

    editRecord(id: number): void {
      this.dialog.closeAll();
      this.recordService.getById(id).subscribe(
        (res) => this.dialog.open(TrackerRecordAddComponent, { data: { model: res, navigateTo: this.router.url, forEntity: this.tracker } }),
        (err) => this.snackbarService.showHttpError(err, $localize`:@@record:Record` + ' ')
      );
    }
    toggleContent(): void {
      this.showContent = !this.showContent;
    }

    deleteRecord(id: number): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { title: $localize`:@@record-delete-title:Please confirm`, message: $localize`:@@record-delete-message:Are you sure you want to delete this Record?` } });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.recordService.delete(id).subscribe(
            () => {
              this.snackbarService.show($localize`:@@record-deleted:Record deleted`);
              this.router.navigateByUrl(this.router.url);
            },
            (err) => this.snackbarService.showHttpError(err, $localize`:@@record:Record` + ' '));
        }
      });
    }

    setBreakpoint(record: TrackerRecord): void {
      if (this.tracker.breakpoint?.id === record.id) {
        this.tracker.breakpoint = null;
      } else {
			this.tracker.breakpoint = record;
      }
      this.trackerService.update(this.tracker).subscribe(
        () => {
          if (this.tracker.breakpoint !== null) {
            this.snackbarService.show($localize`:@@tracker-breakpoint-registered:Breakpoint registered`);
          } else {
            this.snackbarService.show($localize`:@@tracker-breakpoint-removed:Breakpoint removed`);
          }
          this.router.navigateByUrl(this.router.url);
        },
        (err) => this.snackbarService.showHttpError(err, $localize`:@@record:Record` + ' ')
      );
    }
}
