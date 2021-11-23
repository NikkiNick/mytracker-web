import { parseISO } from 'date-fns';
import { BaseSerializer } from 'src/app/shared/crud/serializer/base.serializer';
import { BudgetRecordType } from './budget-record-type.enum';
import { BudgetRecord } from './budget-record.model';

export class BudgetRecordSerializer implements BaseSerializer<BudgetRecord> {
  public fromJson(object: any): BudgetRecord {
    return {
      id: object.id,
      date: parseISO(object.date),
      amount: object.amount,
      type: BudgetRecordType[object.type] as unknown as BudgetRecordType,
      description: object.description,
      name: object.name,
      category: object.category
    } as BudgetRecord;
  }
  public toJson(object: BudgetRecord) {
    return {
      Id: object.id,
      Date: object.date,
      Amount: object.amount,
      Type: BudgetRecordType[object.type],
      Description: object.description,
      Name: object.name,
      CategoryId: object.category.id
    };
  }
}
