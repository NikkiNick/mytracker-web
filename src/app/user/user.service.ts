import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { User } from './user.model';
import { UserSerializer } from './user.serializer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = `${environment.apiUrl}user/`;
  serializer: UserSerializer;

  constructor(private httpClient: HttpClient, private authService: AuthService) { 
    this.serializer = new UserSerializer();
  }

  getAuthenticatedUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}`).pipe(map(user => this.serializer.fromJson(user)));
  }

  insert(user: User) {
    return this.httpClient.post<User>(`${this.apiUrl}`, this.serializer.toJson(user));
  }

  update(user: User) {
    return this.httpClient.put(`${this.apiUrl}`, this.serializer.toJson(user));
  }

  updatePassword(oldPassword: string, newPassword: string){
    return this.httpClient.put(`${this.apiUrl}password`, { oldPassword: oldPassword, newPassword: newPassword });
  }

}
