import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetRecordCategoryOverviewComponent } from './budget-record-category-overview.component';

describe('BudgetRecordCategoryOverviewComponent', () => {
  let component: BudgetRecordCategoryOverviewComponent;
  let fixture: ComponentFixture<BudgetRecordCategoryOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetRecordCategoryOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetRecordCategoryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
