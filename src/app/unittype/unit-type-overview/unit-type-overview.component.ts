import { Component, OnInit } from '@angular/core';
import { UnitType } from '../unit-type.model';
import { UnitTypeService } from '../unit-type.service';

@Component({
  selector: 'app-unit-type-overview',
  templateUrl: './unit-type-overview.component.html',
  styleUrls: ['./unit-type-overview.component.scss']
})
export class UnitTypeOverviewComponent implements OnInit {

  unittypes: UnitType[];
  tableColumnsToDisplay = [ "shortName", "fullName", "actions" ];

  constructor(private service: UnitTypeService) { }

  ngOnInit(): void {
    this.unittypes = this.service.getAll();
  }

}