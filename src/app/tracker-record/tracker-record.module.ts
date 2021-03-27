import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerRecordAddComponent } from './tracker-record-add/tracker-record-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    TrackerRecordAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ]
})
export class TrackerRecordModule { }
