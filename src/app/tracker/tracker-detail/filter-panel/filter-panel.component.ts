import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { isBefore, isAfter, isWithinInterval, compareDesc } from 'date-fns';
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
  form: FormGroup;
  showContent: boolean = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      intervalFrom: [this.tracker.records.length > 0? this.tracker.records[this.tracker.records.length-1]: null] ,
      intervalTo: [this.tracker.records.length > 0? this.tracker.records[0]: null]
    }, { validators: [this.intervalValidator]});
  }

  selectChange(){
    if(this.form.valid){
      let from = this.form.get("intervalFrom").value as TrackerRecord;
      let to = this.form.get("intervalTo").value as TrackerRecord;
      let data = this.tracker.records
                  .filter(r => isWithinInterval(new Date(r.date), {start: new Date(from.date), end: new Date(to.date)})).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .sort((r1, r2) => compareDesc(new Date(r1.date), new Date(r2.date)));
      this.filteredData.emit(data);
    }
  }
  resetChartInterval(){
    this.form.setValue({ 
      intervalFrom: this.tracker.records.length > 0? this.tracker.records[this.tracker.records.length-1]: null,
      intervalTo: this.tracker.records.length > 0? this.tracker.records[0]: null
    });
    this.selectChange();
  }

  toggleContent(){
    this.showContent = !this.showContent;
  }
  intervalValidator: ValidatorFn = (fg: FormGroup) => {
    const from: TrackerRecord = fg.get('intervalFrom').value;
    const to: TrackerRecord = fg.get('intervalTo').value;

    fg.get('intervalTo').setErrors(null);
    fg.get('intervalFrom').setErrors(null);

    if(isBefore(new Date(to.date), new Date(from.date))){
      console.log("error")
      fg.get('intervalTo').setErrors({ toIsBeforeFrom: true });
      fg.get('intervalFrom').setErrors({ toIsBeforeFrom: true });
    } 

    if(from === to){
      fg.get('intervalFrom').setErrors({ sameFromAndTo: true });
      fg.get('intervalTo').setErrors({ sameFromAndTo: true });
    } 

    return from !== null && to !== null && isBefore(new Date(from.date), new Date(to.date))?null:{interval: true};
  }
  compareFn: ((f1: TrackerRecord, f2: TrackerRecord) => boolean) | null = this.compareByValue;

  compareByValue(f1: TrackerRecord, f2: TrackerRecord) { 
    return f1 && f2 && f1.id === f2.id; 
  }
}
