import { IBaseModel } from 'src/app/shared/crud/models/ibase-model';

export class BudgetRecordCategory implements IBaseModel {
  id: number;
  name: string;
  description?: string;
  color: string;
}
