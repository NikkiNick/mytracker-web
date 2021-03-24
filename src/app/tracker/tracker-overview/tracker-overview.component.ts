import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { TrackerAddComponent } from '../tracker-add/tracker-add.component';
import { Tracker } from '../tracker.model';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-tracker-overview',
  templateUrl: './tracker-overview.component.html',
  styleUrls: ['./tracker-overview.component.scss']
})
export class TrackerOverviewComponent implements OnInit, AfterViewInit {

  renderedTrackers: Tracker[];
  tableViewMode: Boolean = false;
  tableColumnsToDisplay = [ 'name', 'unitType', 'created', 'color', 'recordLength', 'recordPrecision', 'actions' ];
  tableDataSource: MatTableDataSource<Tracker>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: TrackerService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
  }

  deleteTracker(id: number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { title: "Please confirm", message: "Are you sure you want to delete this Tracker?" } });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.service.delete(id);
        this.loadData();
      }
    })
  }

  addTracker(){
    this.dialog.closeAll();
    this.dialog.open(TrackerAddComponent, { data: { model: null, navigateTo: this.router.url }});
  }

  editTracker(id: number){
    this.dialog.closeAll();
    const tracker = this.service.getById(id);
    const dialogRef = this.dialog.open(TrackerAddComponent, { data: { model: tracker, navigateTo: this.router.url } });
  }

  private loadData(){
    this.tableDataSource = new MatTableDataSource<Tracker>(this.service.getAll());
    this.tableDataSource.connect().subscribe(d => this.renderedTrackers = d);
  }

}
