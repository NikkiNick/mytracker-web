import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { compareDesc } from 'date-fns';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ManipulationDialogData } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog-data.model';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';
import { BudgetRecordManipulationDialogComponent } from '../../budget-record/budget-record-manipulation-dialog/budget-record-manipulation-dialog.component';
import { BudgetRecord } from '../../budget-record/budget-record.model';
import { BudgetRecordService } from '../../budget-record/budget-record.service';
import { BudgetTracker } from '../../budget-tracker.model';

@Component({
  selector: 'app-income-panel',
  templateUrl: './income-panel.component.html',
  styleUrls: ['./income-panel.component.scss']
})
export class IncomePanelComponent implements OnChanges {

    @Input() records: BudgetRecord[];
    @Input() tracker: BudgetTracker;
    tableColumnsToDisplay = [ 'date', 'amount', 'name', 'actions' ];
    tableDataSource: MatTableDataSource<BudgetRecord>;

    constructor( 
        private dialog: MatDialog,
        private recordService: BudgetRecordService,
        private snackbarService: SnackBarService,
        private router: Router) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.records.currentValue !== changes.records.previousValue) {
            this.records.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
            this.tableDataSource = new MatTableDataSource<BudgetRecord>(this.records);
        }
    }

    editRecord(id: number) {
      this.dialog.closeAll();
      const dialogRef = this.dialog.open(BudgetRecordManipulationDialogComponent, { data: { modelId: id, parentId: this.tracker.id } as ManipulationDialogData});
      dialogRef.componentInstance.service = this.recordService;
      // this.dialog.closeAll();
      // this.recordService.getById(id).subscribe(
      //     (res) => this.dialog.open(TrackerRecordAddComponent, { data: { model: res, navigateTo: this.router.url, forEntity: this.tracker } }),
      //     (err) => this.snackbarService.showHttpError(err, $localize`:@@record:Record` + ' ')
      // );
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
    openAddRecordDialog(){
      this.dialog.open(BudgetRecordManipulationDialogComponent, { data : { parentId: this.tracker.id } as ManipulationDialogData});
    }
  }
