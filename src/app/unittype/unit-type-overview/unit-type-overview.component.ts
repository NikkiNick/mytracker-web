import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
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

  renderedUnitTypes: UnitType[];
  tableColumnsToDisplay = [ "shortName", "fullName", "actions" ];
  tableDataSource: MatTableDataSource<UnitType>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: UnitTypeService, 
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.connect().subscribe(d => this.renderedUnitTypes = d);
  }

  deleteUnitType(id: number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { title: "Please confirm", message: "Are you sure you want to delete this UnitType?" } });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.service.delete(id);
        this.loadData();
      }
    })
  }

  addUnitType(){
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(UnitTypeAddComponent, { data: { model: null } });
  }
  editUnitType(id: number){
    this.dialog.closeAll();
    const unitType = this.service.getById(id);
    const dialogRef = this.dialog.open(UnitTypeAddComponent, { data: { model: unitType } });
  }

  private loadData(){
    this.tableDataSource = new MatTableDataSource<UnitType>(this.service.getAll());
  }

}