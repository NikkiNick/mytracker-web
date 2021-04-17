import { UnitType } from './unit-type.model';

export class UnitTypeDTO {
    public id?: number;
    public shortName: string;
    public longName: string;

    public static create(unittype: UnitType) {
        const dto = new UnitTypeDTO();
        dto.id = unittype.id || null;
        dto.shortName = unittype.shortName;
        dto.longName = unittype.longName;
        return dto;
    }
}
