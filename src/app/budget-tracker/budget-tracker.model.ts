import { UnitType } from "../unittype/unit-type.model";

export class BudgetTracker {
    id: number;
    name: string;
    created: Date;
    color?: string;
    unitType?: UnitType;
    //records: BugetTrackerRecord[];
}