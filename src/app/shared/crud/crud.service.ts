import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseModel } from './models/ibase-model';
import { DtoModel } from './models/dto.model';
import { BaseSerializer } from './serializer/base.serializer';
import { map } from 'rxjs/operators';

export interface ICrudService<T extends IBaseModel> {
  getAll(): Observable<T[]>;
  getById(id: number): Observable<T>;
  insert(item: T): Observable<any>;
  update(item: T): Observable<any>;
  delete(id: number): Observable<any>;
}

export abstract class CrudService<T extends IBaseModel, U extends DtoModel<T>> implements ICrudService<T> {

  apiUrl: string;
  endpoint: string
  className: string;

  constructor(
    private _options: CrudServiceOptions<T>, 
    protected readonly _httpClient: HttpClient,
    protected readonly _serializer: BaseSerializer<T>) {

    this.className = _options.model.name.toLowerCase();
    this.endpoint = _options.altEndpoint || this.className;
    this.apiUrl = `${_options.apiUrl}/${this.endpoint}`
  }
  getAll(): Observable<T[]> {
    return this._httpClient
              .get<T[]>(this.apiUrl, {})
              .pipe(map((data: any[]) => this.convertDatalist(data)));
  }
  getById(id: number): Observable<T> {
    return this._httpClient
              .get<T>(this.apiUrl + "/" + id, {})
              .pipe(map((data: any) => this.convertData(data) as T));
  }
  insert(item: T): Observable<any> {
    return this._httpClient
              .post(this.apiUrl, this._serializer.toJson(item), {});
  }
  update(item: T): Observable<any> {
    return this._httpClient
              .put<any>(this.apiUrl + "/" + item.id, this._serializer.toJson(item), {});
  }
  delete(id: number): Observable<any> {
    return this._httpClient
              .delete<any>(this.apiUrl + "/" + id, {});
  }

  protected convertData(response: any): T {
    return this._serializer.fromJson(response);
  }
  protected convertDatalist(response: any): T[]{
    return response.map((r: any) => this._serializer.fromJson(r) as T);
  }

}

export declare type CrudServiceOptions<T> = {
  model: new (...args:any[]) => T, 
  apiUrl: string,
  altEndpoint?: string, 
}