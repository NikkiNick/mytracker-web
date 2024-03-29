import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRequest } from './auth-request.model';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthResponse } from './auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  storageTokenName = 'MyTrackerToken';
  apiUrl = `${environment.apiUrl}user/authenticate`;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean>;
  attemtedUrlBeforeLoginRedirect: string;

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated.next(!this.isTokenExpired());
    this.isAuthenticated$ = this.isAuthenticated.asObservable();
  }

  authenticate(email: string, password: string): Observable<any> {
    const req: AuthRequest = new AuthRequest();
    req.email = email;
    req.password = password;
    return this.http.post(this.apiUrl, req).pipe(map((res: AuthResponse) => AuthResponse.fromJson(res)));
  }

  getToken(): string | null {
    return localStorage.getItem(this.storageTokenName) || null;
  }

  setToken(token: string): void {
    localStorage.setItem(this.storageTokenName, token);
    this.isAuthenticated.next(true);
    this.router.navigateByUrl('');
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token) as any;

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  logOut() {
    localStorage.removeItem(this.storageTokenName);
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('');
  }

  getAuthenticatedUserId(token: string): number {
    const decoded = jwt_decode(token) as any;

    if (decoded.id === undefined) {
      return null;
    }

    return decoded.id;
  }
}
