import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { MaterialModule } from '../material/material.module';
import { TableColumnDirective } from './crud-table/table-column.directive';
import { RouterModule } from '@angular/router';
import { DialogModule } from '../dialog/dialog.module';
import { ManipulationDialogComponent } from './manipulation-dialog/manipulation-dialog.component';
import { ManipulationDialogData } from './manipulation-dialog/manipulation-dialog-data.model';

@NgModule({
  declarations: [
    CrudTableComponent,
    TableColumnDirective,
    ManipulationDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    DialogModule
  ],
  providers: [
  ],
  exports: [
    CrudTableComponent,
    TableColumnDirective,
    ManipulationDialogComponent
  ]
})
export class CrudModule { }
