import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { DialogModule } from '../dialog/dialog.module';
import { ManipulationDialogComponent } from './manipulation-dialog/manipulation-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridCardDirective } from './crud-table/directives/grid-card.directive';
import { TableColumnDirective } from './crud-table/directives/table-column.directive';
import { GridCardTitleDirective } from './crud-table/directives/grid-card-title.directive';
import { GridCardContentDirective } from './crud-table/directives/grid-card-content.directive';
import { TableActionsColumnDirective } from './crud-table/directives/table-actions-column.directive';

@NgModule({
  declarations: [
    CrudTableComponent,
    TableColumnDirective,
    TableActionsColumnDirective,
    ManipulationDialogComponent,
    GridCardDirective,
    GridCardTitleDirective,
    GridCardContentDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DialogModule
  ],
  providers: [
  ],
  exports: [
    CrudTableComponent,
    TableColumnDirective,
    TableActionsColumnDirective,
    GridCardDirective,
    GridCardTitleDirective,
    GridCardContentDirective,
    ManipulationDialogComponent
  ]
})
export class CrudModule { }
