import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { isBefore, isWithinInterval, compareDesc } from 'date-fns';
import { ChartDataPoint } from 'src/app/shared/graphs/canvas/canvas.types';
import { TrackerRecord } from 'src/app/tracker-record/tracker-record.model';
import { Tracker } from '../../tracker.model';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {
  @Input() tracker: Tracker;
  @Output() filteredData = new EventEmitter<TrackerRecord[]>();
  @Output() selectedDisplayType: EventEmitter<string> = new EventEmitter();
  selectedDisplayTypeVar: 'amount' | 'average' = 'amount';
  form: FormGroup;
  showContent = true;
  compareFn: ((f1: TrackerRecord, f2: TrackerRecord) => boolean) | null = this.compareByValue;

  constructor(private fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    const validators: ValidatorFn[] = [];
    if (this.tracker.records.length > 1) {
      validators.push(this.intervalValidator);
    }
    this.form = this.fb.group({
      intervalFrom: [ this.tracker.breakpoint || (this.tracker.records.length > 0 ? this.tracker.records[0] : null) ],
      intervalTo: [ this.tracker.records.length > 0 ? this.tracker.records[this.tracker.records.length - 1] : null ]
    }, { validators });
    this.selectChange();
  }
  toggleDisplayType(): void{
    this.selectedDisplayTypeVar = this.selectedDisplayTypeVar === 'amount' ? 'average' : 'amount';
    this.selectedDisplayType.emit(this.selectedDisplayTypeVar);
  }
  selectChange(): void {
    if (this.form.valid) {
      const from = this.form.get('intervalFrom').value as TrackerRecord;
      const to = this.form.get('intervalTo').value as TrackerRecord;
      const data = this.tracker.records
        .filter((r) => isWithinInterval(new Date(r.date), { start: new Date(from.date), end: new Date(to.date) })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .sort((r1, r2) => compareDesc(new Date(r1.date), new Date(r2.date)));
      this.filteredData.emit(data);
    }
  }
  resetChartInterval(): void {
    this.form.setValue({
      intervalFrom: this.tracker.breakpoint || this.tracker.records[0],
      intervalTo: this.tracker.records.length > 0 ? this.tracker.records[this.tracker.records.length - 1] : null
    });
    this.selectChange();
  }
  toggleContent(): void {
    this.showContent = !this.showContent;
  }
  intervalValidator: ValidatorFn = (fg: FormGroup) => {
    const from: TrackerRecord = fg.get('intervalFrom').value;
    const to: TrackerRecord = fg.get('intervalTo').value;

    fg.get('intervalTo').setErrors(null);
    fg.get('intervalFrom').setErrors(null);

    if (to && from) {
      if (isBefore(new Date(to.date), new Date(from.date))) {
        fg.get('intervalTo').setErrors({ toIsBeforeFrom: true });
        fg.get('intervalFrom').setErrors({ toIsBeforeFrom: true });
      }

      if (from === to) {
        fg.get('intervalFrom').setErrors({ sameFromAndTo: true });
        fg.get('intervalTo').setErrors({ sameFromAndTo: true });
      }
    }

    return from !== null && to !== null && isBefore(new Date(from.date), new Date(to.date)) ? null : { interval: true };
  };

  compareByValue(f1: TrackerRecord, f2: TrackerRecord): boolean {
    return f1 && f2 && f1.id === f2.id;
  }
}
