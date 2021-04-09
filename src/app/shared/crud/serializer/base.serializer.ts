import { IBaseModel } from "../models/ibase-model";

export abstract class BaseSerializer<T extends IBaseModel> {
    public fromJson(object: any): T {
        return object as T;
    }
    public toJson(object: T): any{
        return object;
    }
}