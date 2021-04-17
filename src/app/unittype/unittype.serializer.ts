import { BaseSerializer } from '../shared/crud/serializer/base.serializer';
import { UnitType } from './unit-type.model';

export class UnitTypeSerializer extends BaseSerializer<UnitType> {

    constructor() {
        super();
    }

    public fromJson(object: any): UnitType {
        return {
            id: object.id,
            shortName: object.shortName,
            longName: object.longName,
        } as UnitType;
    }
    public toJson(object: UnitType): any {
        return {
            id: object.id,
            shortName: object.shortName,
            longName: object.longName
        };
    }

}
