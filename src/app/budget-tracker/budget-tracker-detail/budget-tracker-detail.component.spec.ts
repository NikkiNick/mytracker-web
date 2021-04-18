import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTrackerDetailComponent } from './budget-tracker-detail.component';

describe('BudgetTrackerDetailComponent', () => {
  let component: BudgetTrackerDetailComponent;
  let fixture: ComponentFixture<BudgetTrackerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetTrackerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetTrackerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
