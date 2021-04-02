import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerRecordAddComponent } from './tracker-record-add/tracker-record-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { TrackerRecordDisplayComponent } from './tracker-record-display/tracker-record-display.component';
import { TrackerRecordDifferenceDisplayComponent } from './tracker-record-difference-display/tracker-record-difference-display.component';



@NgModule({
  declarations: [
    TrackerRecordAddComponent,
    TrackerRecordDisplayComponent,
    TrackerRecordDifferenceDisplayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    TrackerRecordDisplayComponent,
    TrackerRecordDifferenceDisplayComponent
  ]
})
export class TrackerRecordModule { }
