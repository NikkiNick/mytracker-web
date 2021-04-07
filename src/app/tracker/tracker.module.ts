import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerOverviewComponent } from './tracker-overview/tracker-overview.component';
import { TrackerService } from './tracker.service';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TrackerDetailComponent } from './tracker-detail/tracker-detail.component';
import { TrackerAddComponent } from './tracker-add/tracker-add.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { SettingsPanelComponent } from './tracker-detail/settings-panel/settings-panel.component';
import { RecordPanelComponent } from './tracker-detail/record-panel/record-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { TrackerRecordModule } from '../tracker-record/tracker-record.module';
import { ChartPanelComponent } from './tracker-detail/chart-panel/chart-panel.component';
import { FilterPanelComponent } from './tracker-detail/filter-panel/filter-panel.component';

@NgModule({
  declarations: [
    TrackerOverviewComponent,
    TrackerDetailComponent,
    TrackerAddComponent,
    SettingsPanelComponent,
    RecordPanelComponent,
    ChartPanelComponent,
    FilterPanelComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    SharedModule,
    TrackerRecordModule
  ],
  providers: [
    TrackerService
  ],
  entryComponents: [
    TrackerAddComponent
  ]
})
export class TrackerModule { }
