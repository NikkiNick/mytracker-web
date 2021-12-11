import { NgModule } from '@angular/core';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { MaterialModule } from './material/material.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ChartComponent } from './graphs/chart/chart.component';
import { CrudModule } from './crud/crud.module';
import { DialogModule } from './dialog/dialog.module';
import { PageComponent } from './page/page.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StackedBarChartComponent } from './graphs/stacked-bar-chart/stacked-bar-chart.component';
import { CanvasComponent } from './graphs/canvas/canvas.component';


@NgModule({
  declarations: [
    BreadCrumbsComponent,
    ConfirmationDialogComponent,
    ChartComponent,
    PageComponent,
    ToggleButtonComponent,
    StackedBarChartComponent
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
	StackedBarChartComponent,
    MaterialModule,
    CrudModule,
    DialogModule,
    PageComponent
  ]
})
export class SharedModule { }
