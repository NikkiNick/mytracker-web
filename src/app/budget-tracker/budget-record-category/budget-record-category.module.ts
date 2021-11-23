import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetRecordCategoryService } from './budget-record-category.service';
import { BudgetRecordCategory } from './budget-record-category.model';
import { BudgetRecordCategoryOverviewComponent } from './budget-record-category-overview/budget-record-category-overview.component';
import { BudgetRecordCategoryManipulationDialogComponent } from './budget-record-category-manipulation-dialog/budget-record-category-manipulation-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BudgetRecordCategoryOverviewComponent,
    BudgetRecordCategoryManipulationDialogComponent
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
      provide: 'BudgetRecordCategoryServiceConfig',
      useValue: {
        model: BudgetRecordCategory,
        apiUrl: 'http://localhost:54980/api',
        altEndpoint: 'budget-record-categories'
      }
    },
    BudgetRecordCategoryService
  ]
})
export class BudgetRecordCategoryModule { }
