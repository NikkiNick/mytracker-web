import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitTypeOverviewComponent } from './unit-type-overview/unit-type-overview.component';
import { UnitTypeDetailComponent } from './unit-type-detail/unit-type-detail.component';
import { UnitTypeAddComponent } from './unit-type-add/unit-type-add.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UnitTypeOverviewComponent, 
    UnitTypeDetailComponent, 
    UnitTypeAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ]
})
export class UnitTypeModule { }
