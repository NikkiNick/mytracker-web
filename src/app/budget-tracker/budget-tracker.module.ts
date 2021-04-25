import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetTrackerService } from './budget-tracker.service';
import { BudgetTracker } from './budget-tracker.model';
import { BudgetTrackerOverviewComponent } from './budget-tracker-overview/budget-tracker-overview.component';
import { SharedModule } from '../shared/shared.module';
import { BudgetTrackerManipulationDialogComponent } from './budget-tracker-manipulation-dialog/budget-tracker-manipulation-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BudgetTrackerDetailComponent } from './budget-tracker-detail/budget-tracker-detail.component';
import { BudgetRecord } from './budget-record/budget-record.model';
import { BudgetRecordService } from './budget-record/budget-record.service';
import { BudgetRecordManipulationDialogComponent } from './budget-record/budget-record-manipulation-dialog/budget-record-manipulation-dialog.component';
import { RecordPanelComponent } from './budget-tracker-detail/record-panel/record-panel.component';
import { IncomePanelComponent } from './budget-tracker-detail/income-panel/income-panel.component';
import { ExpensePanelComponent } from './budget-tracker-detail/expense-panel/expense-panel.component';
import { FilterPanelComponent } from './budget-tracker-detail/filter-panel/filter-panel.component';

@NgModule({
  declarations: [ 
    BudgetTrackerOverviewComponent, BudgetTrackerManipulationDialogComponent, BudgetTrackerDetailComponent, BudgetRecordManipulationDialogComponent, RecordPanelComponent, IncomePanelComponent, ExpensePanelComponent, FilterPanelComponent
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
    {
      provide: 'BudgetRecordServiceConfig',
      useValue: {
        model: BudgetTracker,
        nestedModel: BudgetRecord,
        apiUrl: 'http://localhost:54980/api',
        altEndpoint: "budget-tracker",
        altNestedEndpoint: "records"
      }
    },
    BudgetTrackerService,
    BudgetRecordService
  ],
  entryComponents: [ BudgetTrackerManipulationDialogComponent, BudgetRecordManipulationDialogComponent ]
})
export class BudgetTrackerModule { }
