import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbsComponent } from '../bread-crumbs/bread-crumbs.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    BreadCrumbsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [ 
    BreadCrumbsComponent,
    CommonModule,
    RouterModule,
    MaterialModule 
  ]
})
export class SharedModule { }
