import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTypeOverviewComponent } from './unit-type-overview.component';

describe('UnitTypeOverviewComponent', () => {
  let component: UnitTypeOverviewComponent;
  let fixture: ComponentFixture<UnitTypeOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitTypeOverviewComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTypeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
