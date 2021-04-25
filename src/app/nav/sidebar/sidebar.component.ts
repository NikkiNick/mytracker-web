import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BudgetRecordCategoryManipulationDialogComponent } from 'src/app/budget-tracker/budget-record-category/budget-record-category-manipulation-dialog/budget-record-category-manipulation-dialog.component';
import { BudgetRecordCategoryService } from 'src/app/budget-tracker/budget-record-category/budget-record-category.service';
import { ManipulationDialogData } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog-data.model';
import { TrackerManipulationDialogComponent } from 'src/app/tracker/tracker-manipulation-dialog/tracker-manipulation-dialog.component';
import { TrackerService } from 'src/app/tracker/tracker.service';
import { UnitTypeManipulationDialogComponent } from 'src/app/unittype/unit-type-manipulation-dialog/unit-type-manipulation-dialog.component';
import { UnitTypeService } from 'src/app/unittype/unit-type.service';
import { AuthService } from '../../auth/auth.service';
import { TrackerRecordAddComponent } from '../../tracker-record/tracker-record-add/tracker-record-add.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private trackerService: TrackerService,
    private unitTypeService: UnitTypeService,
    private budgetRecordCategoryService: BudgetRecordCategoryService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(auth => this.isAuthenticated = auth);
  }

  openDialog_addTracker(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(TrackerManipulationDialogComponent, { data: { modelId: null, navigateTo: '/trackers/overview' } as unknown as ManipulationDialogData });
    dialogRef.componentInstance.service = this.trackerService;

  }
  openDialog_addUnitType(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(UnitTypeManipulationDialogComponent, { data: { modelId: null, navigateTo: '/unittypes/overview' } as unknown as ManipulationDialogData });
    dialogRef.componentInstance.service = this.unitTypeService;

  }
  openDialog_addTrackerRecord(): void {
    this.dialog.closeAll();
    const dialogRed = this.dialog.open(TrackerRecordAddComponent, { data: { model: null, navigateTo: '/trackers/detail/', forEntity: null }});
  }
  openDialog_addBudgetRecordCategory():void{
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(BudgetRecordCategoryManipulationDialogComponent, { data: { modelId: null, navigateTo: '/budgetcategories/overview' } as unknown as ManipulationDialogData });
    dialogRef.componentInstance.service = this.budgetRecordCategoryService;
  }
  logOut() {
    this.authService.logOut();
  }
}
