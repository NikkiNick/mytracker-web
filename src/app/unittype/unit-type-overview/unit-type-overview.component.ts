import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';
import { Tracker } from 'src/app/tracker/tracker.model';
import { UnitTypeAddComponent } from '../unit-type-add/unit-type-add.component';
import { UnitTypeManipulationDialogComponent } from '../unit-type-manipulation-dialog/unit-type-manipulation-dialog.component';
import { UnitType } from '../unit-type.model';
import { UnitTypeService } from '../unit-type.service';

@Component({
  selector: 'app-unit-type-overview',
  templateUrl: './unit-type-overview.component.html',
  styleUrls: ['./unit-type-overview.component.scss']
})
export class UnitTypeOverviewComponent {
  
  manipulationDialog = UnitTypeManipulationDialogComponent;

  constructor(public service: UnitTypeService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

}
