import { DtoModel } from '../shared/crud/models/dto.model';
import { Tracker } from './tracker.model';

export class TrackerDTO extends DtoModel<Tracker> {
    id?: number;
    created?: Date;
    name: string;
    color: string;
    unitTypeId: number;
    recordPrecision: number;
    breakpointRecordId: number;
}
