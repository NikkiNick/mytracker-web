import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrackerAddComponent } from '../tracker/tracker-add/tracker-add.component';
import { UnitTypeAddComponent } from '../unittype/unit-type-add/unit-type-add.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  openDialog_addTracker(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(TrackerAddComponent, { data: { model: null, navigateTo: '/trackers/overview' } });
    
  }
  openDialog_addUnitType(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(UnitTypeAddComponent, { data: { model: null, navigateTo: '/unittypes/overview' }});
    
  }
}