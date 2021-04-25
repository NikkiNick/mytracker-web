import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseModel } from './models/ibase-model';
import { DtoModel } from './models/dto.model';
import { BaseSerializer } from './serializer/base.serializer';
import { map } from 'rxjs/operators';

export interface ICrudService<T extends IBaseModel> {
  getAll(parentId?: number): Observable<T[]>;
  getById(id: number, parentId?: number): Observable<T>;
  insert(item: T, parentId?: number): Observable<any>;
  update(item: T, parentId?: number): Observable<any>;
  delete(id: number, parentId?: number): Observable<any>;
}

export abstract class CrudService<T extends IBaseModel> implements ICrudService<T> {

  apiUrl: string;
  endpoint: string;
  className: string;

  constructor(
    private options: CrudServiceOptions<T>,
    protected readonly httpClient: HttpClient,
    protected readonly serializer: BaseSerializer<T>) {

    this.className = this.options.model.name.toLowerCase();
    this.endpoint = this.options.altEndpoint || this.className;
    this.apiUrl = `${this.options.apiUrl}/${this.endpoint}`;
  }
  getAll(): Observable<T[]> {
    return this.httpClient
              .get<T[]>(this.apiUrl, {})
              .pipe(map((data: any[]) => data.map((d: any) => this.serializer.fromJson(d))));
  }
  getById(id: number): Observable<T> {
    return this.httpClient
              .get<T>(this.apiUrl + '/' + id, {})
              .pipe(map((data: any) => this.serializer.fromJson(data)));
  }
  insert(item: T): Observable<any> {
    return this.httpClient
              .post(this.apiUrl, this.serializer.toJson(item), {});
  }
  update(item: T): Observable<any> {
    return this.httpClient
              .put<any>(this.apiUrl + '/' + item.id, this.serializer.toJson(item), {});
  }
  delete(id: number): Observable<any> {
    return this.httpClient
              .delete<any>(this.apiUrl + '/' + id, {});
  }

}

export declare interface CrudServiceOptions<T> {
  model: new (...args: any[]) => T;
  apiUrl: string;
  altEndpoint?: string;
}
