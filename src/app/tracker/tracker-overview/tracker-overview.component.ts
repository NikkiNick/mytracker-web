import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrackerRecordAddComponent } from 'src/app/tracker-record/tracker-record-add/tracker-record-add.component';
import { TrackerManipulationDialogComponent } from '../tracker-manipulation-dialog/tracker-manipulation-dialog.component';
import { Tracker } from '../tracker.model';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-tracker-overview',
  templateUrl: './tracker-overview.component.html',
  styleUrls: ['./tracker-overview.component.scss']
})
export class TrackerOverviewComponent {
  manipulationDialog = TrackerManipulationDialogComponent;

  constructor(
    public service: TrackerService,
    private router: Router,
    private dialog: MatDialog) {}

  openAddRecordDialog(tracker: Tracker): void {
    this.dialog.closeAll();
    this.dialog.open(TrackerRecordAddComponent, { data: { model: null, navigateTo: this.router.url, forEntity: tracker } });
  }
}
