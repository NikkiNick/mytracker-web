import { IBaseModel } from '../shared/crud/models/ibase-model';

export class UnitType implements IBaseModel {
    id?: number;
    shortName: string;
    longName: string;
}
