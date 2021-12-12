import { IBaseModel } from '../shared/crud/models/ibase-model';

export class User implements IBaseModel {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  created: Date;
}
