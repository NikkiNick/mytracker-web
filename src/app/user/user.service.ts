import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICrudService } from '../shared/crud/crud.service';
import { User } from './user.model';
import { UserSerializer } from './user.serializer';

@Injectable({
  providedIn: 'root'
})
export class UserService implements ICrudService<User>{

  apiUrl = `${environment.apiUrl}user/`;
  serializer: UserSerializer;

  constructor(private httpClient: HttpClient) { 
    this.serializer = new UserSerializer();
  }
  getAll(): Observable<User[]> {
    return this.httpClient
              .get<User[]>(`${this.apiUrl}`)
              .pipe(map(users => users.map(user => this.serializer.fromJson(user))));
  }
  getById(id: number): Observable<User> {
    return this.httpClient
              .get<User>(`${this.apiUrl}${id}`)
              .pipe(map(user => this.serializer.fromJson(user)));
  }
  insert(user: User): Observable<any> {
    return this.httpClient
              .post<User>(`${this.apiUrl}`, this.serializer.toJson(user));
  }
  update(user: User): Observable<any> {
    return this.httpClient
              .put(`${this.apiUrl}`, this.serializer.toJson(user));
  }
  delete(id: number): Observable<any> {
    return this.httpClient
              .delete<any>(`${this.apiUrl}${id}`);
  }
  getAuthenticatedUser(): Observable<User> {
    return this.httpClient
              .get<User>(`${this.apiUrl}`)
              .pipe(map(user => this.serializer.fromJson(user)));
  }
  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.httpClient
              .put(`${this.apiUrl}password`, { oldPassword: oldPassword, newPassword: newPassword });
  }
}
