import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { Tracker } from 'src/app/tracker/tracker.model';
import { UnitTypeAddComponent } from '../unit-type-add/unit-type-add.component';
import { UnitType } from '../unit-type.model';
import { UnitTypeService } from '../unit-type.service';

@Component({
  selector: 'app-unit-type-overview',
  templateUrl: './unit-type-overview.component.html',
  styleUrls: ['./unit-type-overview.component.scss']
})
export class UnitTypeOverviewComponent implements OnInit, AfterViewInit {

  tableColumnsToDisplay = [ 'shortName', 'longName', 'actions' ];
  tableDataSource: MatTableDataSource<UnitType>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: UnitTypeService,
    private router: Router,
    private dialog: MatDialog,
    private snackbarService: SnackBarService) {

      this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => this.loadData() );
    }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  deleteUnitType(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { title: 'Please confirm', message: 'Are you sure you want to delete this UnitType?' } });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.service.delete(id).subscribe(
          () => {
            this.snackbarService.show('UnitType deleted');
            this.router.navigateByUrl('/unittypes/overview');
          },
          err => this.snackbarService.showHttpError(err, 'UnitType ')
        );
      }
    });
  }

  addUnitType() {
    this.dialog.closeAll();
    this.dialog.open(UnitTypeAddComponent, { data: { model: null } });
  }
  editUnitType(id: number) {
    this.dialog.closeAll();
    this.service.getById(id).subscribe(
      res => this.dialog.open(UnitTypeAddComponent, { data: { model: res } }),
      err => this.snackbarService.showHttpError(err, 'UnitType ')
    );
  }

  private loadData() {
    this.service.getAll().subscribe(
      data => {
        this.tableDataSource = new MatTableDataSource<UnitType>(data);
        this.tableDataSource.paginator = this.paginator;
        this.tableDataSource.sort = this.sort;
      },
      err => this.snackbarService.showHttpError(err, 'UnitType ')
    );
  }

}
