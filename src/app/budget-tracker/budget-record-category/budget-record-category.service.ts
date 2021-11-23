import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CrudService, CrudServiceOptions } from 'src/app/shared/crud/crud.service';
import { BudgetRecordCategory } from './budget-record-category.model';
import { BudgetRecordCategorySerializer } from './budget-record-category.serializer';

@Injectable({
  providedIn: 'root'
})
export class BudgetRecordCategoryService extends CrudService<BudgetRecordCategory> implements IBudgetRecordCategoryService {

  constructor(@Inject('BudgetRecordCategoryServiceConfig') options: CrudServiceOptions<BudgetRecordCategory>, protected httpClient: HttpClient) {
      super(options, httpClient, new BudgetRecordCategorySerializer());
  }

}

export interface IBudgetRecordCategoryService {}
