import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService, CrudServiceOptions } from '../shared/crud/crud.service';
import { UnitTypeAddComponent } from './unit-type-add/unit-type-add.component';
import { UnitType } from './unit-type.model';
import { UnitTypeDTO } from './unit-typeDTO.model';
import { UnitTypeSerializer } from './unittype.serializer';

@Injectable({
  providedIn: 'root'
})
export class UnitTypeService extends CrudService<UnitType, UnitTypeDTO> implements ITrackerService{

  constructor(@Inject("UnittypeServiceConfig") options: CrudServiceOptions<UnitType>, protected httpClient: HttpClient) {
      super(options, httpClient, new UnitTypeSerializer());
     }
}

export interface ITrackerService{}
