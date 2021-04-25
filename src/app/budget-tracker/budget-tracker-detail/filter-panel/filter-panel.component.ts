import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { compareAsc, compareDesc, format, isAfter, isBefore, isSameDay, isWithinInterval, parseISO } from 'date-fns';
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
    this.form = this.fb.group({
      intervalFrom: [ this.filterDates[0] || null ] ,
      intervalTo: [ this.filterDates[this.filterDates.length-1] || null ],
      displayIncome: [ true ],
      displayExpense: [ true ]
    }, { validators });
    this.selectChange();
  }

  selectChange() {
    if (this.form.valid) {
      const fromDate = this.form.get('intervalFrom').value;
      const toDate = this.form.get('intervalTo').value;
      const displayIncome = this.form.get("displayIncome").value;
      const displayExpense = this.form.get("displayExpense").value;
      let data = this.tracker.records
                  .filter(r => isAfter(new Date(r.date), fromDate) || isSameDay(new Date(r.date), fromDate))
                  .filter(r => isBefore(new Date(r.date), toDate) || isSameDay(new Date(r.date), toDate));
      if(displayIncome && !displayExpense){
          data = data.filter(r => r.type === BudgetRecordType.INCOME);
      }
      if(displayExpense && !displayIncome){
          data = data.filter(r => r.type === BudgetRecordType.EXPENSE);
      }
      if(!displayIncome && !displayExpense){
          data = [];
      }
                  //.filter(r => iisBefore(new Date(r.date), parseISO(toDate)));
                  //.filter(r => isWithinInterval(new Date(r.date), {start: fromDate, end: toDate}));
                  //.sort((r1, r2) => compareDesc(new Date(r1.date), new Date(r2.date)));
      this.filteredData.emit(data);
    }
  }
  resetChartInterval() {
    this.form.setValue({
      intervalFrom: this.filterDates[0] || null ,
      intervalTo: this.filterDates[this.filterDates.length-1] || null,
      displayIncome: true,
      displayExpense: true
    });
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
}