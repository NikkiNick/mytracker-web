import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { compareDesc } from 'date-fns';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ManipulationDialogData } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog-data.model';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';
import { TrackerRecordAddComponent } from 'src/app/tracker-record/tracker-record-add/tracker-record-add.component';
import { TrackerRecord } from 'src/app/tracker-record/tracker-record.model';
import { TrackerRecordService } from 'src/app/tracker-record/tracker-record.service';
import { TrackerService } from 'src/app/tracker/tracker.service';
import { BudgetRecordManipulationDialogComponent } from '../../budget-record/budget-record-manipulation-dialog/budget-record-manipulation-dialog.component';
import { BudgetRecordType } from '../../budget-record/budget-record-type.enum';
import { BudgetRecord } from '../../budget-record/budget-record.model';
import { BudgetRecordService } from '../../budget-record/budget-record.service';
import { BudgetTracker } from '../../budget-tracker.model';
import { BudgetTrackerService } from '../../budget-tracker.service';

@Component({
  selector: 'app-record-panel',
  templateUrl: './record-panel.component.html',
  styleUrls: ['./record-panel.component.scss']
})
export class RecordPanelComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() filteredRecords: BudgetRecord[];
  @Input() tracker: BudgetTracker;
  tableColumnsToDisplay = [ 'category', 'date', 'amount', 'name', 'description', 'actions' ];
  tableDataSource: MatTableDataSource<BudgetRecord>;
  showContent = true;
  recordTypes = BudgetRecordType;

  constructor(
    private dialog: MatDialog,
    private recordService: BudgetRecordService,
    private trackerService: BudgetTrackerService,
    private snackbarService: SnackBarService,
    private router: Router) {}

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
      // this.filteredRecords.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
      // this.tableDataSource = new MatTableDataSource<BudgetRecord>(this.filteredRecords);
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes.filteredRecords.currentValue !== changes.filteredRecords.previousValue) {
          this.filteredRecords.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
          this.tableDataSource = new MatTableDataSource<BudgetRecord>(this.filteredRecords);
      }
  }

  addRecord() {
      this.dialog.closeAll();
      const dialogRef = this.dialog.open(BudgetRecordManipulationDialogComponent, { data: { modelId: null, parentId: this.tracker.id } as ManipulationDialogData});
      dialogRef.componentInstance.service = this.recordService;
  }

  editRecord(id: number) {
      this.dialog.closeAll();
      const dialogRef = this.dialog.open(BudgetRecordManipulationDialogComponent, { data: { modelId: id, parentId: this.tracker.id } as ManipulationDialogData});
      dialogRef.componentInstance.service = this.recordService;
  }
  toggleContent() {
      this.showContent = !this.showContent;
  }

  deleteRecord(id: number) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { title: $localize`:@@record-delete-title:Please confirm`, message: $localize`:@@record-delete-message:Are you sure you want to delete this Record?` } });
      dialogRef.afterClosed().subscribe(res => {
          if (res) {
              this.recordService.delete(id, this.tracker.id).subscribe(
                  () => {
                      this.snackbarService.show($localize`:@@record-deleted:Record deleted`);
                      this.router.navigateByUrl(this.router.url);
                  },
                  (err) => this.snackbarService.showHttpError(err, $localize`:@@record:Record` + ' '));
          }
      });
  }

}
