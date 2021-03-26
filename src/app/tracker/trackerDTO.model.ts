import { TrackerDetailComponent } from "./tracker-detail/tracker-detail.component"
import { Tracker } from "./tracker.model"

export class TrackerDTO {
    name: String
    color: String
    unitTypeId: number
    recordLength: number
    recordPrecision: number

    static create(tracker: Tracker): TrackerDTO{
        let dto = new TrackerDTO();
        dto.name = tracker.name;
        dto.color = tracker.color;
        dto.unitTypeId = tracker.unitType.id;
        dto.recordLength = tracker.recordLength;
        dto.recordPrecision = tracker.recordPrecision;
        return dto;
    }
}