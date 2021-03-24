import { Injectable } from '@angular/core';
import { UnitTypeAddComponent } from './unit-type-add/unit-type-add.component';
import { UnitType } from './unit-type.model';

@Injectable({
  providedIn: 'root'
})
export class UnitTypeService {

  unittypes: Array<UnitType> = [
    { id: 1, shortName: "m3", fullName: "Kubieke meter"}
  ];

  getById(id: number): UnitType {
      return this.unittypes.find(u => u.id === id);
  }

  getAll(): Array<UnitType> {
    return this.unittypes;
  }

  insert(unitType: UnitType) {
    this.unittypes.push(unitType);
  }

  update(unitType: UnitType){
    let index = this.unittypes.findIndex(u => u.id === unitType.id)
    if(index !== -1){
      this.unittypes[index] = unitType;
    }
  }

  delete(id: number){
    const index = this.unittypes.findIndex(e => e.id === id);
    if(index !== -1){
      this.unittypes.splice(index, 1);
    }
  }

}
