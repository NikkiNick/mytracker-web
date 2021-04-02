import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { TrackerAddComponent } from '../tracker-add/tracker-add.component';
import { Tracker } from '../tracker.model';
import { TrackerService } from '../tracker.service';

@Component({
    selector: 'app-tracker-overview',
    templateUrl: './tracker-overview.component.html',
    styleUrls: ['./tracker-overview.component.scss']
})
export class TrackerOverviewComponent implements OnInit, AfterViewInit {
  renderedTrackers: Tracker[] = [];
  tableViewMode = false;
  tableColumnsToDisplay = [ 'name', 'latestRecord', 'unitType', 'created', 'color', 'recordLength', 'recordPrecision', 'actions' ];
  tableDataSource: MatTableDataSource<Tracker>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: TrackerService,
    private dialog: MatDialog,
    private router: Router,
    private snackbarService: SnackBarService) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.loadData();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  deleteTracker(id: number) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { title: 'Please confirm', message: 'Are you sure you want to delete this Tracker?' } });
      dialogRef.afterClosed().subscribe((res) => {
          if (res) {
              this.service.delete(id).subscribe(
                  () => {
                      this.snackbarService.show('Tracker deleted');
                      this.router.navigateByUrl('/trackers/overview');
                  },
                  (err) => this.snackbarService.showHttpError(err, 'Tracker '));
          }
      });
  }

  addTracker() {
      this.dialog.closeAll();
      this.dialog.open(TrackerAddComponent, { data: { model: null, navigateTo: this.router.url } });
  }

  editTracker(id: number) {
      this.dialog.closeAll();
      this.service.getById(id).subscribe(
          (res) => this.dialog.open(TrackerAddComponent, { data: { model: res, navigateTo: this.router.url } }),
          (err) => this.snackbarService.showHttpError(err, 'Tracker ')
      );
  }

  private loadData() {
      this.service.getAll().subscribe((trackers) => {
          this.tableDataSource = new MatTableDataSource<Tracker>(trackers);
          this.tableDataSource.connect().subscribe((d) => this.renderedTrackers = d);
          this.tableDataSource.paginator = this.paginator;
          this.tableDataSource.sort = this.sort;
      });
  }
}
