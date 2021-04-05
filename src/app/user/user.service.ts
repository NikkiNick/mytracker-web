import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = `${environment.apiUrl}user/`;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getAuthenticatedUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}`);
  }

  insert(user: User) {
    return this.httpClient.post<User>(`${this.apiUrl}`, user);
  }

  update(user: User) {
    return this.httpClient.put(`${this.apiUrl}`, user);
  }

  updatePassword(oldPassword: string, newPassword: string){
    return this.httpClient.put(`${this.apiUrl}password`, { oldPassword: oldPassword, newPassword: newPassword });
  }

}
