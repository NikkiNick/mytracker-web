import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManipulationDialogData } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog-data.model';
import { BudgetTrackerManipulationDialogComponent } from '../../budget-tracker-manipulation-dialog/budget-tracker-manipulation-dialog.component';
import { BudgetTracker } from '../../budget-tracker.model';
import { BudgetTrackerService } from '../../budget-tracker.service';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss']
})
export class SettingsPanelComponent implements OnInit {

  @Input() tracker: BudgetTracker;
  showContent = true;

  constructor(private dialog: MatDialog, private service: BudgetTrackerService) { }

  ngOnInit(): void {
  }
  editTracker() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(BudgetTrackerManipulationDialogComponent, { data: { modelId: this.tracker.id } as unknown as ManipulationDialogData });
    dialogRef.componentInstance.service = this.service;
  }

  toggleContent() {
    this.showContent = !this.showContent;
  }
}
