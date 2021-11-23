import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './dialog.component';


@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    DialogComponent
  ]
})
export class DialogModule { }
