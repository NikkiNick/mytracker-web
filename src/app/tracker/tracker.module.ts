import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerOverviewComponent } from './tracker-overview/tracker-overview.component';
import { TrackerService } from './tracker.service';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TrackerDetailComponent } from './tracker-detail/tracker-detail.component';
import { TrackerAddComponent } from './tracker-add/tracker-add.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { SettingsPanelComponent } from './tracker-detail/settings-panel/settings-panel.component';
import { RecordPanelComponent } from './tracker-detail/record-panel/record-panel.component';

@NgModule({
  declarations: [
    TrackerOverviewComponent,
    TrackerDetailComponent,
    TrackerAddComponent,
    SettingsPanelComponent,
    RecordPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ColorPickerModule
  ], 
  providers: [
    TrackerService
  ],
  entryComponents: [
    TrackerAddComponent
  ]
})
export class TrackerModule { }
