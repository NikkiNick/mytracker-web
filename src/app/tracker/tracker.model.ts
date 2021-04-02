import { TrackerRecord } from '../tracker-record/tracker-record.model';
import { UnitType } from '../unittype/unit-type.model';

export class Tracker {
    id: number;
    name: string;
    created: Date;
    color?: string;
    recordLength = 4;
    recordPrecision = 2;
    unitType?: UnitType;
    records: TrackerRecord[];
}
