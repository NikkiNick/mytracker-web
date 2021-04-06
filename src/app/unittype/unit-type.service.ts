import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnitTypeAddComponent } from './unit-type-add/unit-type-add.component';
import { UnitType } from './unit-type.model';
import { UnitTypeDTO } from './unit-typeDTO.model';

@Injectable({
  providedIn: 'root'
})
export class UnitTypeService {

  apiUrl = `${environment.apiUrl}unittype/`;

  constructor(private httpClient: HttpClient) {}

  getById(id: number): Observable<UnitType> {
      return this.httpClient.get<UnitType>(`${this.apiUrl}${id}`);
  }

  getAll(): Observable<UnitType[]> {
    return this.httpClient.get<UnitType[]>(this.apiUrl);
  }

  insert(unitType: UnitType) {
    return this.httpClient.post<UnitType>(`${this.apiUrl}`, unitType);
  }

  update(unitType: UnitType) {
    const dto = UnitTypeDTO.create(unitType);
    return this.httpClient.put(`${this.apiUrl}${unitType.id}`, dto);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.apiUrl}${id}`);
  }

}
