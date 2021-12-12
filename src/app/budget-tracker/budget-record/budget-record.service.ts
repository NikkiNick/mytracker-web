import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NestedCrudService, NestedCrudServiceOptions } from 'src/app/shared/crud/nested-crud.service';
import { BudgetTracker } from '../budget-tracker.model';
import { BudgetRecord } from './budget-record.model';
import { BudgetRecordSerializer } from './budget-record.serializer';

@Injectable({
	providedIn: 'root'
})
export class BudgetRecordService extends NestedCrudService<BudgetTracker, BudgetRecord> {
  constructor(@Inject('BudgetRecordServiceConfig') options: NestedCrudServiceOptions<BudgetTracker, BudgetRecord>, protected httpClient: HttpClient) {
    super(options, httpClient, new BudgetRecordSerializer());
  }
}
