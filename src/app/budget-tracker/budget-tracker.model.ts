import { IBaseModel } from "../shared/crud/models/ibase-model";
import { UnitType } from "../unittype/unit-type.model";

export class BudgetTracker implements IBaseModel{
    id: number;
    name: string;
    created: Date;
    color?: string;
    currency: string;
    //records: BugetTrackerRecord[];
}