import { IBaseModel } from "../models/ibase-model";

export abstract class BaseSerializer<T> {
    public fromJson(object: any): T {
        return object as T;
    }
    public toJson(object: T): any{
        return object;
    }
}