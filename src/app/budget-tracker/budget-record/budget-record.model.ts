import { IBaseModel } from "src/app/shared/crud/models/ibase-model";
import { BudgetRecordCategory } from "../budget-record-category/budget-record-category.model";
import { BudgetRecordType } from "./budget-record-type.enum";

export class BudgetRecord implements IBaseModel{
    id: number;
    date: Date;
    type: BudgetRecordType;
    amount: number;
    name: string;
    description: string;
    category: BudgetRecordCategory
}