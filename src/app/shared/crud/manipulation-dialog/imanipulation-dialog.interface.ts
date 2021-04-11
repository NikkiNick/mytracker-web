import { BehaviorSubject, Subject } from "rxjs";
import { ICrudService } from "../crud.service";
import { IBaseModel } from "../models/ibase-model";

export interface IManipulationDialog<T extends IBaseModel>{
    readonly service: ICrudService<T>;
    model: BehaviorSubject<T>;
}