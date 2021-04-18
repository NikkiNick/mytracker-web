import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetTrackerService } from './budget-tracker.service';
import { BudgetTracker } from './budget-tracker.model';
import { BudgetTrackerOverviewComponent } from './budget-tracker-overview/budget-tracker-overview.component';
import { SharedModule } from '../shared/shared.module';
import { BudgetTrackerManipulationDialogComponent } from './budget-tracker-manipulation-dialog/budget-tracker-manipulation-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BudgetTrackerDetailComponent } from './budget-tracker-detail/budget-tracker-detail.component';

@NgModule({
  declarations: [ 
    BudgetTrackerOverviewComponent, BudgetTrackerManipulationDialogComponent, BudgetTrackerDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [ 
    {
      provide: 'BudgetTrackerServiceConfig',
      useValue: {
        model: BudgetTracker,
        apiUrl: 'http://localhost:54980/api',
        altEndpoint: "budget-tracker"
      }
    },
    BudgetTrackerService 
  ],
  entryComponents: [ BudgetTrackerManipulationDialogComponent ]
})
export class BudgetTrackerModule { }
