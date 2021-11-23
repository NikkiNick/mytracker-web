import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTypeManipulationDialogComponent } from './unit-type-manipulation-dialog.component';

describe('UnitTypeManipulationDialogComponent', () => {
  let component: UnitTypeManipulationDialogComponent;
  let fixture: ComponentFixture<UnitTypeManipulationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitTypeManipulationDialogComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTypeManipulationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
