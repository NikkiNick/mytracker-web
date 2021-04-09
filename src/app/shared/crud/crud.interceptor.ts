import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CrudInterceptor<T> implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {

    return next.handle(request);
  }
}
