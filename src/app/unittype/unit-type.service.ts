import { Injectable } from '@angular/core';
import { UnitType } from './unit-type.model';

@Injectable({
  providedIn: 'root'
})
export class UnitTypeService {

  getAll(): Array<UnitType> {
    return [
      { id: "1", shortName: "kWh", fullName: "Kilowatt per uur" }
    ];
  }
}
