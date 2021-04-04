import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = `${environment.apiUrl}user/`;

  constructor(private httpClient: HttpClient) { }

  getById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}${id}`);
  }

  insert(user: User) {
    return this.httpClient.post<User>(`${this.apiUrl}`, user);
  }

  update(user: User) {
    return this.httpClient.put(`${this.apiUrl}${user.id}`, user);
  }

}
