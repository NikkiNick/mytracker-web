import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { compareDesc } from 'date-fns';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ManipulationDialogData } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog-data.model';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';
import { BudgetRecordManipulationDialogComponent } from '../../budget-record/budget-record-manipulation-dialog/budget-record-manipulation-dialog.component';
import { BudgetRecordType } from '../../budget-record/budget-record-type.enum';
import { BudgetRecord } from '../../budget-record/budget-record.model';
import { BudgetRecordService } from '../../budget-record/budget-record.service';
import { BudgetTrackerManipulationDialogComponent } from '../../budget-tracker-manipulation-dialog/budget-tracker-manipulation-dialog.component';
import { BudgetTracker } from '../../budget-tracker.model';
import { BudgetTrackerService } from '../../budget-tracker.service';

@Component({
  selector: 'app-record-panel',
  templateUrl: './record-panel.component.html',
  styleUrls: ['./record-panel.component.scss']
})
export class RecordPanelComponent implements OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() filteredRecords: BudgetRecord[];
  @Input() tracker: BudgetTracker;
  tableColumnsToDisplay = [ 'category', 'date', 'amount', 'name', 'description', 'actions' ];
  tableDataSource: MatTableDataSource<BudgetRecord>;
  showContent = true;
  recordTypes = BudgetRecordType;

  constructor(
    private dialog: MatDialog,
    private recordService: BudgetRecordService,
    private snackbarService: SnackBarService,
    private router: Router,
    private budgetTrackerService: BudgetTrackerService) {}
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filteredRecords.currentValue !== changes.filteredRecords.previousValue) {
      this.filteredRecords.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
      this.tableDataSource = new MatTableDataSource<BudgetRecord>(this.filteredRecords);
    }
  }
  editTracker(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(BudgetTrackerManipulationDialogComponent, { data: { modelId: this.tracker.id } as unknown as ManipulationDialogData });
    dialogRef.componentInstance.service = this.budgetTrackerService;
  }
  addRecord(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(BudgetRecordManipulationDialogComponent, { data: { modelId: null, parentId: this.tracker.id } as ManipulationDialogData });
    dialogRef.componentInstance.service = this.recordService;
  }

  editRecord(id: number): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(BudgetRecordManipulationDialogComponent, { data: { modelId: id, parentId: this.tracker.id } as ManipulationDialogData });
    dialogRef.componentInstance.service = this.recordService;
  }
  toggleContent(): void {
    this.showContent = !this.showContent;
  }

  deleteRecord(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { title: $localize`:@@record-delete-title:Please confirm`, message: $localize`:@@record-delete-message:Are you sure you want to delete this Record?` } });
    dialogRef.afterClosed().subscribe((res) => {
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
