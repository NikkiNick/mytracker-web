import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrackerManipulationDialogComponent } from '../tracker-manipulation-dialog/tracker-manipulation-dialog.component';
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
    private router: Router) {
       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
}
