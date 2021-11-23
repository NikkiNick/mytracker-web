import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CrudService, CrudServiceOptions, ICrudService } from '../shared/crud/crud.service';
import { User } from './user.model';
import { UserSerializer } from './user.serializer';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> implements IUserService {

  constructor(@Inject('UserServiceConfig') options: CrudServiceOptions<User>, protected httpClient: HttpClient) {
    super(options, httpClient, new UserSerializer());
   }

  getAuthenticatedUser(): Observable<User> {
    return this.httpClient
              .get<User>(`${this.apiUrl}`)
              .pipe(map(user => this.serializer.fromJson(user)));
  }
  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.httpClient
              .put(`${this.apiUrl}/password`, { oldPassword, newPassword });
  }
}
export interface IUserService {
  getAuthenticatedUser(): Observable<User>;
  updatePassword(oldPassword: string, newPassword: string): Observable<any>;
}
