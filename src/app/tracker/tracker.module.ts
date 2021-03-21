import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerOverviewComponent } from './tracker-overview/tracker-overview.component';
import { TrackerService } from './tracker.service';
import { MaterialModule } from '../material/material.module';
import { TrackerMainComponent } from './tracker-main/tracker-main.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TrackerDetailComponent } from './tracker-detail/tracker-detail.component';
import { TrackerAddComponent } from './tracker-add/tracker-add.component';

@NgModule({
  declarations: [
    TrackerMainComponent,
    TrackerOverviewComponent,
    TrackerDetailComponent,
    TrackerAddComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule
  ], 
  providers: [
    TrackerService
  ]
})
export class TrackerModule { }
