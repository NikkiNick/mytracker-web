import { Tracker } from './tracker.model';

export class TrackerDTO {
    id?: number;
    created?: Date;
    name: string;
    color: string;
    unitTypeId: number;
    recordLength: number;
    recordPrecision: number;
    breakpointRecordId: number;

    static create(tracker: Tracker): TrackerDTO {
        const dto = new TrackerDTO();
        dto.id = tracker.id || null;
        dto.created = tracker.created || null;
        dto.name = tracker.name;
        dto.color = tracker.color;
        dto.unitTypeId = tracker.unitType?.id;
        dto.recordLength = tracker.recordLength;
        dto.recordPrecision = tracker.recordPrecision;
        dto.breakpointRecordId = tracker.breakpoint?.id;
        return dto;
    }
}
