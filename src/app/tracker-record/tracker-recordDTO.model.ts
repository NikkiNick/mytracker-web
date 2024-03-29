import { Tracker } from '../tracker/tracker.model';
import { TrackerRecord } from './tracker-record.model';

export class TrackerRecordDTO {
  public id: number;
  public amount: number;
  public trackerId: number;

  public static create(record: TrackerRecord, tracker: Tracker) {
    const dto = new TrackerRecordDTO();
    dto.id = record.id || null;
    dto.amount = record.amount;
    dto.trackerId = tracker.id;
    return dto;
  }
}
