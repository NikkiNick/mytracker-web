import { IBaseModel } from '../shared/crud/models/ibase-model';
import { TrackerRecord } from '../tracker-record/tracker-record.model';
import { UnitType } from '../unittype/unit-type.model';

export class Tracker implements IBaseModel {
    id?: number;
    name: string;
    created: Date;
    color?: string;
    recordPrecision = 2;
    unitType?: UnitType;
    records: TrackerRecord[];
    breakpoint?: TrackerRecord;
}
