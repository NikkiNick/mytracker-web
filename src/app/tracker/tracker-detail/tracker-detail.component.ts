import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackerAddComponent } from '../tracker-add/tracker-add.component';
import { Tracker } from '../tracker.model';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-tracker-detail',
  templateUrl: './tracker-detail.component.html',
  styleUrls: ['./tracker-detail.component.scss']
})
export class TrackerDetailComponent implements OnInit {

  tracker: Tracker;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private service: TrackerService,
    private dialog: MatDialog ) { 
    this.route.params.subscribe(p => {
      const id:number = +p['id'];
      this.tracker = this.service.getById(id);
    });
  }

  ngOnInit(): void {
  }
  
}
