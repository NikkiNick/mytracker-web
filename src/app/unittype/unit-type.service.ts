import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CrudService, CrudServiceOptions } from '../shared/crud/crud.service';
import { UnitType } from './unit-type.model';
import { UnitTypeSerializer } from './unittype.serializer';

@Injectable({
  providedIn: 'root'
})
export class UnitTypeService extends CrudService<UnitType> implements ITrackerService {
  constructor(@Inject('UnittypeServiceConfig') options: CrudServiceOptions<UnitType>, protected httpClient: HttpClient) {
    super(options, httpClient, new UnitTypeSerializer());
  }
}

export interface ITrackerService {}
