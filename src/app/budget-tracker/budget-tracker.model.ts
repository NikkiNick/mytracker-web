import { IBaseModel } from "../shared/crud/models/ibase-model";
import { BudgetRecord } from "./budget-record/budget-record.model";

export class BudgetTracker implements IBaseModel{
    id: number;
    name: string;
    created: Date;
    color?: string;
    currency: string;
    records: BudgetRecord[];
}