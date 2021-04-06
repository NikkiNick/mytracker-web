import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { MaterialModule } from '../material/material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TrackerModule } from '../tracker/tracker.module';
import { TrackerRecordModule } from '../tracker-record/tracker-record.module';
import { UnitTypeModule } from '../unittype/unit-type.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SidebarComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    MaterialModule,
    TrackerModule,
    TrackerRecordModule,
    UnitTypeModule
  ],
  exports: [
    SidebarComponent,
    NavigationComponent
  ]
})

export class NavModule { }
