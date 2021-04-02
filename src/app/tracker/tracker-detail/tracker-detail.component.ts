import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { TrackerRecord } from 'src/app/tracker-record/tracker-record.model';
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
  filteredRecords: TrackerRecord[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TrackerService,
    private snackbarService: SnackBarService) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.params.subscribe(p => {
      const id: number = +p.id;
      this.service.getById(id).subscribe(
        data => this.tracker = data,
        (err: HttpErrorResponse) => {
          this.snackbarService.showHttpError(err, 'Tracker ');
          this.router.navigate(['/trackers/overview']);
        }
      );
    });
  }

  ngOnInit(): void {
  }
  setFilteredData(data: TrackerRecord[]) {
    this.filteredRecords = data;
  }

}
