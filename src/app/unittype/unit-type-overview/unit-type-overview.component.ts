import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UnitTypeManipulationDialogComponent } from '../unit-type-manipulation-dialog/unit-type-manipulation-dialog.component';
import { UnitTypeService } from '../unit-type.service';

@Component({
  selector: 'app-unit-type-overview',
  templateUrl: './unit-type-overview.component.html',
  styleUrls: ['./unit-type-overview.component.scss']
})
export class UnitTypeOverviewComponent {
  
  manipulationDialog = UnitTypeManipulationDialogComponent;

  constructor(public service: UnitTypeService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

}
