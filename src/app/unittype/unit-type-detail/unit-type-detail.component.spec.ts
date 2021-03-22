import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTypeDetailComponent } from './unit-type-detail.component';

describe('UnitTypeDetailComponent', () => {
  let component: UnitTypeDetailComponent;
  let fixture: ComponentFixture<UnitTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
