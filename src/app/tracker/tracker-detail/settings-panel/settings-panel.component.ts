import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrackerAddComponent } from '../../tracker-add/tracker-add.component';
import { Tracker } from '../../tracker.model';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss']
})
export class SettingsPanelComponent implements OnInit {

  @Input() tracker: Tracker;

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }
  editTracker(){
    this.dialog.closeAll();
    this.dialog.open(TrackerAddComponent, { data: { model: this.tracker, navigateTo: this.router.url } });
  }
}
