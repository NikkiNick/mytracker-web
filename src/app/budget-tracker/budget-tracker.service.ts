import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CrudService, CrudServiceOptions } from '../shared/crud/crud.service';
import { TrackerSerializer } from '../tracker/tracker.serializer';
import { BudgetTracker } from './budget-tracker.model';
import { BudgetTrackerSerializer } from './budget-tracker.serializer';

@Injectable({
    providedIn: 'root'
})
export class BudgetTrackerService extends CrudService<BudgetTracker> implements IBudgetTrackerService {

    constructor(@Inject('BudgetTrackerServiceConfig') options: CrudServiceOptions<BudgetTracker>, protected httpClient: HttpClient) {
        super(options, httpClient, new BudgetTrackerSerializer());
    }

}

export interface IBudgetTrackerService {}
