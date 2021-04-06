import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { TrackerRecordAddComponent } from '../../tracker-record/tracker-record-add/tracker-record-add.component';
import { TrackerAddComponent } from '../../tracker/tracker-add/tracker-add.component';
import { UnitTypeAddComponent } from '../../unittype/unit-type-add/unit-type-add.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(private dialog: MatDialog, private router: Router, private authService: AuthService) { 
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(auth => this.isAuthenticated = auth);
  }

  openDialog_addTracker(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(TrackerAddComponent, { data: { model: null, navigateTo: '/trackers/overview' } });

  }
  openDialog_addUnitType(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(UnitTypeAddComponent, { data: { model: null, navigateTo: '/unittypes/overview' }});

  }
  openDialog_addTrackerRecord(): void {
    this.dialog.closeAll();
    const dialogRed = this.dialog.open(TrackerRecordAddComponent, { data: { model: null, navigateTo: '/trackers/detail/', forEntity: null }})
  }
  logOut(){
    this.authService.logOut();
  }
}
