import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitTypeOverviewComponent } from './unit-type-overview/unit-type-overview.component';
import { UnitTypeDetailComponent } from './unit-type-detail/unit-type-detail.component';
import { UnitTypeAddComponent } from './unit-type-add/unit-type-add.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnitTypeService } from './unit-type.service';
import { SharedModule } from '../shared/shared.module';



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
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [ UnitTypeService ]
})
export class UnitTypeModule { }
