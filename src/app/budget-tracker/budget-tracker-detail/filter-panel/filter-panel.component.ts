import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { compareAsc, format, isAfter, isBefore, isSameDay } from 'date-fns';
import { BudgetRecordCategory } from '../../budget-record-category/budget-record-category.model';
import { BudgetRecordType } from '../../budget-record/budget-record-type.enum';
import { BudgetRecord } from '../../budget-record/budget-record.model';
import { BudgetTracker } from '../../budget-tracker.model';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit, AfterContentChecked {
	
	@Input() tracker: BudgetTracker;
	@Output() filteredData = new EventEmitter<BudgetRecord[]>();
  filterDates: Date[];
  filterCategories: { category: BudgetRecordCategory, selected: boolean }[];
  incomeFilter = true;
  expenseFilter = true;
  form: FormGroup;
  showContent = true;
  compareFn: ((f1: Date, f2: Date) => boolean) | null = this.compareByValue;

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) { 

  }
  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }
  ngOnInit(): void {
    const validators: ValidatorFn[] = [];
    if (this.tracker.records.length > 1) {
      validators.push(this.intervalValidator);
    }
    this.generateFilterDates();
    this.generateFilterCategories();
    this.form = this.fb.group({
      intervalFrom: [ this.filterDates[0] || null ],
      intervalTo: [ this.filterDates[this.filterDates.length-1] || null ]
    }, { validators });
    this.selectChange();
  }
  toggleCategoryFilter(category: BudgetRecordCategory): void {
    const filterCategory = this.filterCategories.find((e) => e.category === category);
    if (filterCategory) {
      filterCategory.selected = !filterCategory.selected;
    }
    this.selectChange();
  }
  toggleIncomeFilter(): void {
    this.incomeFilter = !this.incomeFilter;
    this.selectChange();
  }
  toggleExpenseFilter(): void {
    this.expenseFilter = !this.expenseFilter;
    this.selectChange();
  }
  selectChange(): void {
    if (this.form.valid) {
      // Date filter
      const fromDate = this.form.get('intervalFrom').value;
      const toDate = this.form.get('intervalTo').value;
      let data = this.tracker.records
        .filter((r) => isAfter(new Date(r.date), fromDate) || isSameDay(new Date(r.date), fromDate))
        .filter((r) => isBefore(new Date(r.date), toDate) || isSameDay(new Date(r.date), toDate));
      // Display filter
      if (this.incomeFilter && !this.expenseFilter) {
        data = data.filter((r) => r.type === BudgetRecordType.INCOME);
      }
      if (this.expenseFilter && !this.incomeFilter) {
        data = data.filter((r) => r.type === BudgetRecordType.EXPENSE);
      }
      if (!this.incomeFilter && !this.expenseFilter) {
        data = [];
      }
      // Category filter
      data = data.filter((r) => this.filterCategories.filter((c) => c.selected).map((c) => c.category.id).indexOf(r.category.id) !== -1);

      this.filteredData.emit(data);
    }
  }
  resetChartInterval(): void {
    this.form.setValue({
      intervalFrom: this.filterDates[0] || null,
      intervalTo: this.filterDates[this.filterDates.length-1] || null
    });
    this.incomeFilter = true;
    this.expenseFilter = true;
    this.filterCategories.forEach((e) => e.selected = true);
    this.selectChange();
  }

  toggleContent(): void {
    this.showContent = !this.showContent;
  }

  intervalValidator: ValidatorFn = (fg: FormGroup) => {
    const from: Date = fg.get('intervalFrom').value;
    const to: Date = fg.get('intervalTo').value;

    fg.get('intervalTo').setErrors(null);
    fg.get('intervalFrom').setErrors(null);

    if (to && from) {
      if (isBefore(to, from)) {
        fg.get('intervalTo').setErrors({ toIsBeforeFrom: true });
        fg.get('intervalFrom').setErrors({ toIsBeforeFrom: true });
      }
    }

    return from !== null && to !== null && (isBefore(from, to) || isSameDay(from, to)) ? null : { interval: true };
  };

  compareByValue(f1: Date, f2: Date): boolean {
    return f1 && f2 && f1 === f2;
  }
  private generateFilterDates(): void {
    const tempFilterDatesStrings = new Set(this.tracker.records.map((r) => format(new Date(r.date), 'MM-dd-yyyy')));
    const tempFilterDates = [];
    for (const entry of tempFilterDatesStrings) {
      tempFilterDates.push(new Date(entry));
    }

    this.filterDates = [...tempFilterDates.sort((r1, r2) => compareAsc(r1, r2))];
  }
  private generateFilterCategories(): void {
    const cats = this.tracker.records.map((r) => r.category);
    const tempFilterCategories: { category: BudgetRecordCategory, selected: boolean }[] = [];
    for (const cat of cats) {
      if (tempFilterCategories.findIndex((e) => e.category.id === cat.id) === -1) {
        tempFilterCategories.push({ category: cat, selected: true });
      }
    }
    this.filterCategories = tempFilterCategories;
  }
}
