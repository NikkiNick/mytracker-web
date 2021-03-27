import { Tracker } from "../tracker/tracker.model";
import { TrackerRecord } from "./tracker-record.model";

export class TrackerRecordDTO {
    public amount: Number;
    public trackerId: Number;

    public static create(record: TrackerRecord, tracker: Tracker){
        let dto = new TrackerRecordDTO();
        dto.amount = record.amount;
        dto.trackerId = tracker.id;
        return dto;
    }
}