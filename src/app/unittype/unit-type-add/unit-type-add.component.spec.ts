import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTypeAddComponent } from './unit-type-add.component';

describe('UnitTypeAddComponent', () => {
  let component: UnitTypeAddComponent;
  let fixture: ComponentFixture<UnitTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
