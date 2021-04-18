import { BaseSerializer } from "../shared/crud/serializer/base.serializer";
import { BudgetTracker } from "./budget-tracker.model";

export class BudgetTrackerSerializer implements BaseSerializer<BudgetTracker> {
    public fromJson(object: any): BudgetTracker {
        return {
            id: object.id,
            name: object.name,
            created: object.created,
            color: object.color,
            currency: object.currency
        } as BudgetTracker;
    }
    public toJson(object: BudgetTracker) {
        return {
            id: object.id,
            name: object.name,
            created: object.created,
            color: object.color,
            currency: object.currency
        }
    }

}