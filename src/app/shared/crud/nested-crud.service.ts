import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICrudService } from './crud.service';
import { IBaseModel } from './models/ibase-model';
import { BaseSerializer } from './serializer/base.serializer';

export abstract class NestedCrudService<T extends IBaseModel, U extends IBaseModel> implements ICrudService<U> {
  apiUrl: string;
  endpoint: string;
  nestedEndpoint: string;
  className: string;
  nestedClassName: string;

  constructor(
      private options: NestedCrudServiceOptions<T, U>,
      protected readonly httpClient: HttpClient,
      protected readonly serializer: BaseSerializer<U>) {
    this.className = this.options.model.name.toLowerCase();
    this.nestedClassName = this.options.nestedModel.name.toLowerCase();
    this.endpoint = this.options.altEndpoint || this.className;
    this.nestedEndpoint = this.options.altNestedEndpoint || this.nestedClassName;
    this.apiUrl = `${this.options.apiUrl}/${this.endpoint}`;
  }
  getAll(parentId: number): Observable<U[]> {
    return this.httpClient
      .get(`${this.apiUrl}/${parentId}/${this.nestedEndpoint}`, {})
      .pipe(map((data: any[]) => data.map((d: any) => this.serializer.fromJson(d))));
  }
  getById(id: number, parentId: number): Observable<U> {
    return this.httpClient
      .get(`${this.apiUrl}/${parentId}/${this.nestedEndpoint}/${id}`, {})
      .pipe(map((data: U) => this.serializer.fromJson(data)));
  }
  insert(item: U, parentId: number): Observable<any> {
    return this.httpClient
      .post(`${this.apiUrl}/${parentId}/${this.nestedEndpoint}`, this.serializer.toJson(item), {});
  }
  update(item: U, parentId: number): Observable<any> {
    return this.httpClient
      .put<any>(`${this.apiUrl}/${parentId}/${this.nestedEndpoint}/${item.id}`, this.serializer.toJson(item), {});
  }
  delete(id: number, parentId: number): Observable<any> {
    return this.httpClient
      .delete<any>(`${this.apiUrl}/${parentId}/${this.nestedEndpoint}/${id}`, {});
  }
}

export declare interface NestedCrudServiceOptions<T, U> {
    model: new (...args: any[]) => T;
    nestedModel: new (...args: any[]) => U;
    apiUrl: string;
    altEndpoint?: string;
    altNestedEndpoint?: string;
}

