import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerOverviewComponent } from './tracker-overview/tracker-overview.component';
import { TrackerService } from './tracker.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TrackerDetailComponent } from './tracker-detail/tracker-detail.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { SettingsPanelComponent } from './tracker-detail/settings-panel/settings-panel.component';
import { RecordPanelComponent } from './tracker-detail/record-panel/record-panel.component';
import { TrackerRecordModule } from '../tracker-record/tracker-record.module';
import { ChartPanelComponent } from './tracker-detail/chart-panel/chart-panel.component';
import { FilterPanelComponent } from './tracker-detail/filter-panel/filter-panel.component';
import { Tracker } from './tracker.model';
import { TrackerManipulationDialogComponent } from './tracker-manipulation-dialog/tracker-manipulation-dialog.component';

@NgModule({
  declarations: [
    TrackerOverviewComponent,
    TrackerDetailComponent,
    SettingsPanelComponent,
    RecordPanelComponent,
    ChartPanelComponent,
    FilterPanelComponent,
    TrackerManipulationDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    SharedModule,
    TrackerRecordModule
  ],
  providers: [
    {
      provide: 'TrackerServiceConfig',
      useValue: {
        model: Tracker,
        apiUrl: 'http://localhost:54980/api'
      }
    },
    TrackerService
  ],
  entryComponents: [
    TrackerManipulationDialogComponent
  ]
})
export class TrackerModule { }


