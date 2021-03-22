import { Component, OnInit } from '@angular/core';
import { Tracker } from '../tracker.model';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-tracker-overview',
  templateUrl: './tracker-overview.component.html',
  styleUrls: ['./tracker-overview.component.scss']
})
export class TrackerOverviewComponent implements OnInit {

  trackers: Tracker[];
  tableViewMode: Boolean = false;

  constructor(private service: TrackerService) { }

  ngOnInit(): void {
    this.trackers = this.service.getAll()
  }

}
