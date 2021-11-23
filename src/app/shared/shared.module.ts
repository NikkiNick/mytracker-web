import { NgModule } from '@angular/core';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { MaterialModule } from './material/material.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ChartComponent } from './chart/chart.component';
import { CrudModule } from './crud/crud.module';
import { DialogModule } from './dialog/dialog.module';
import { PageComponent } from './page/page.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


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
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CrudModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
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
