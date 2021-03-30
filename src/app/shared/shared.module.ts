import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbsComponent } from '../bread-crumbs/bread-crumbs.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ChartComponent } from './chart/chart.component';



@NgModule({
  declarations: [
    BreadCrumbsComponent,
    ConfirmationDialogComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [ 
    BreadCrumbsComponent,
    ChartComponent,
    CommonModule,
    RouterModule,
    MaterialModule 
  ]
})
export class SharedModule { }
