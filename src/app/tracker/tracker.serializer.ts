import { BaseSerializer } from '../shared/crud/serializer/base.serializer';
import { Tracker } from './tracker.model';

export class TrackerSerializer extends BaseSerializer<Tracker> {
  constructor() {
    super();
  }

  public fromJson(object: any): Tracker {
    return {
      id: object.id,
      name: object.name,
      created: object.created,
      color: object.color,
      recordPrecision: object.recordPrecision,
      records: object.records,
      unitType: object.unitType,
      breakpoint: object.breakpoint
    } as Tracker;
  }
  public toJson(object: Tracker): any {
    return {
      id: object.id,
      name: object.name,
      created: object.created,
      color: object.color,
      recordPrecision: object.recordPrecision,
      records: object.records,
      unitTypeId: object.unitType.id,
      breakpointRecordId: object.breakpoint?.id
    };
  }
}
