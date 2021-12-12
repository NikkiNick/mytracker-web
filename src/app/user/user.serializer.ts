import { BaseSerializer } from '../shared/crud/serializer/base.serializer';
import { User } from './user.model';

export class UserSerializer extends BaseSerializer<User> {
  public fromJson(object: any): User {
    return {
      id: object.Id,
      firstName: object.FirstName,
      lastName: object.LastName,
      created: object.Created,
      email: object.Email
    } as User;
  }
  public toJson(object: User): any {
    return {
      Id: object.id,
      FirstName: object.firstName,
      LastName: object.lastName,
      Created: object.created,
      Email: object.email
    };
  }
}
