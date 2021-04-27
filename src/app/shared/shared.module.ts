import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ChartComponent } from './chart/chart.component';
import { CrudModule } from './crud/crud.module';
import { DialogModule } from './dialog/dialog.module';
import { PageComponent } from './page/page.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';



@NgModule({
  declarations: [
    BreadCrumbsComponent,
    ConfirmationDialogComponent,
    ChartComponent,
    PageComponent,
    ToggleButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    CrudModule
  ],
  exports: [
    BreadCrumbsComponent,
    ConfirmationDialogComponent,
    ToggleButtonComponent,
    ChartComponent,
    MaterialModule,
    CrudModule,
    DialogModule,
    PageComponent
  ]
})
export class SharedModule { }
