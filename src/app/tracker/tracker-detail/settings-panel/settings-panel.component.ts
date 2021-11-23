import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManipulationDialogData } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog-data.model';
import { TrackerManipulationDialogComponent } from '../../tracker-manipulation-dialog/tracker-manipulation-dialog.component';
import { Tracker } from '../../tracker.model';
import { TrackerService } from '../../tracker.service';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss']
})
export class SettingsPanelComponent{
  @Input() tracker: Tracker;
  showContent = true;

  constructor(private dialog: MatDialog, private service: TrackerService) { }

  editTracker() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(TrackerManipulationDialogComponent, { data: { modelId: this.tracker.id } as unknown as ManipulationDialogData });
    dialogRef.componentInstance.service = this.service;
  }

  toggleContent() {
    this.showContent = !this.showContent;
  }
}
