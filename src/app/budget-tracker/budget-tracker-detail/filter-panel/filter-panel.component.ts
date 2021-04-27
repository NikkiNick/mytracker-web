import { trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { compareAsc, compareDesc, format, isAfter, isBefore, isSameDay, isWithinInterval, parseISO } from 'date-fns';
import { BudgetRecordCategory } from '../../budget-record-category/budget-record-category.model';
import { BudgetRecordType } from '../../budget-record/budget-record-type.enum';
import { BudgetRecord } from '../../budget-record/budget-record.model';
import { BudgetTracker } from '../../budget-tracker.model';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  filterDates: Date[];
  filterCategories: { category: BudgetRecordCategory, isActive: boolean }[];
  incomeFilter: boolean = true;
  expenseFilter: boolean = true;
  @Input() tracker: BudgetTracker;
  @Output() filteredData = new EventEmitter<BudgetRecord[]>();
  form: FormGroup;
  showContent = true;
  compareFn: ((f1: Date, f2: Date) => boolean) | null = this.compareByValue;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const validators: ValidatorFn[] = [];
    if (this.tracker.records.length > 1) {
      validators.push(this.intervalValidator);
    }
    this.generateFilterDates()
    this.generateFilterCategories();
    this.form = this.fb.group({
      intervalFrom: [ this.filterDates[0] || null ] ,
      intervalTo: [ this.filterDates[this.filterDates.length-1] || null ]
    }, { validators });
    this.selectChange();
  }
  toggleCategoryFilter(category: BudgetRecordCategory){
    let filterCategory = this.filterCategories.find(e => e.category === category);
    if(filterCategory){
      filterCategory.isActive = !filterCategory.isActive;
    }
    this.selectChange();
  }
  toggleIncomeFilter(){
    this.incomeFilter = !this.incomeFilter;
    this.selectChange();
  }
  toggleExpenseFilter(){
    this.expenseFilter = !this.expenseFilter;
    this.selectChange();
  }
  selectChange() {
    if (this.form.valid) {
      // Date filter
      const fromDate = this.form.get('intervalFrom').value;
      const toDate = this.form.get('intervalTo').value;
      let data = this.tracker.records
                  .filter(r => isAfter(new Date(r.date), fromDate) || isSameDay(new Date(r.date), fromDate))
                  .filter(r => isBefore(new Date(r.date), toDate) || isSameDay(new Date(r.date), toDate));
      // Display filter
      if(this.incomeFilter && !this.expenseFilter){
          data = data.filter(r => r.type === BudgetRecordType.INCOME);
      }
      if(this.expenseFilter && !this.incomeFilter){
          data = data.filter(r => r.type === BudgetRecordType.EXPENSE);
      }
      if(!this.incomeFilter && !this.expenseFilter){
          data = [];
      }
      // Category filter
      data = data.filter(r => this.filterCategories.filter(c => c.isActive).map(c => c.category.id).indexOf(r.category.id) !== -1);

      this.filteredData.emit(data);
    }
  }
  resetChartInterval() {
    this.form.setValue({
      intervalFrom: this.filterDates[0] || null ,
      intervalTo: this.filterDates[this.filterDates.length-1] || null
    });
    this.incomeFilter = true;
    this.expenseFilter = true;
    this.filterCategories.forEach(e => e.isActive = true);
    this.selectChange();
  }

  toggleContent() {
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

    return from !== null && to !== null && (isBefore(from, to) || isSameDay(from, to)) ? null : {interval: true};
  }

  compareByValue(f1: Date, f2: Date) {
    return f1 && f2 && f1 === f2;
  }
  private generateFilterDates(){
    let tempFilterDatesStrings = new Set(this.tracker.records.map(r => format(new Date(r.date), "MM-dd-yyyy")));
    let tempFilterDates = [];
    for(let entry of tempFilterDatesStrings){
      tempFilterDates.push(new Date(entry));
    }

    this.filterDates = [...tempFilterDates.sort((r1, r2) => compareAsc(r1, r2))];
  }
  private generateFilterCategories(){
    let cats = this.tracker.records.map(r => r.category);
    let tempFilterCategories: { category: BudgetRecordCategory, isActive: boolean }[] = [];
    for(let cat of cats){
      if(tempFilterCategories.findIndex(e => e.category.id === cat.id) === -1){
        tempFilterCategories.push({ category: cat, isActive: true });
      }
    }
    this.filterCategories = tempFilterCategories;
    // for(let entry of tempFilterCategories){
    //   tempFilterCat.push({ category: entry, isActive: true });
    // }
    // this.filterCategories = [...tempFilterCat];
  }
}