import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTrackerOverviewComponent } from './budget-tracker-overview.component';

describe('BudgetTrackerOverviewComponent', () => {
  let component: BudgetTrackerOverviewComponent;
  let fixture: ComponentFixture<BudgetTrackerOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetTrackerOverviewComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetTrackerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
