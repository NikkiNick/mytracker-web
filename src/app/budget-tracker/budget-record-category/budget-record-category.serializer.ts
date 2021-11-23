import { BaseSerializer } from 'src/app/shared/crud/serializer/base.serializer';
import { BudgetRecordCategory } from './budget-record-category.model';

export class BudgetRecordCategorySerializer implements BaseSerializer<BudgetRecordCategory> {
  public fromJson(object: any): BudgetRecordCategory {
    return {
      id: object.id,
      name: object.name,
      description: object.description,
      color: object.color
    } as BudgetRecordCategory;
  }
  public toJson(object: BudgetRecordCategory) {
    return {
      id: object.id,
      name: object.name,
      description: object.description,
      color: object.color
    };
  }
}
