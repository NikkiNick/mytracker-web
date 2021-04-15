import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitTypeOverviewComponent } from './unit-type-overview/unit-type-overview.component';
import { UnitTypeDetailComponent } from './unit-type-detail/unit-type-detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnitTypeService } from './unit-type.service';
import { SharedModule } from '../shared/shared.module';
import { UnitType } from './unit-type.model';
import { UnitTypeManipulationDialogComponent } from './unit-type-manipulation-dialog/unit-type-manipulation-dialog.component';



@NgModule({
  declarations: [
    UnitTypeOverviewComponent,
    UnitTypeDetailComponent,
    UnitTypeManipulationDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [ 
    {   
      provide: "UnittypeServiceConfig", 
      useValue: {
        model: UnitType,
        apiUrl: "http://localhost:54980/api" 
      }
    },
    UnitTypeService 
  ],
  entryComponents: [
    UnitTypeManipulationDialogComponent
  ]
})
export class UnitTypeModule { }
