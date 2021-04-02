import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartOptions } from 'src/app/shared/chart/chart-options.model.js';
import { ChartComponent } from 'src/app/shared/chart/chart.component.js';
import { Tracker } from '../../tracker.model.js';
import { compareDesc, differenceInSeconds, isAfter, isBefore } from 'date-fns'
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { TrackerRecord } from 'src/app/tracker-record/tracker-record.model.js';
import { ChartCoordinate } from 'src/app/shared/chart/chart.types.js';


@Component({
  selector: 'app-chart-panel',
  templateUrl: './chart-panel.component.html',
  styleUrls: ['./chart-panel.component.scss']
})
export class ChartPanelComponent implements OnInit, OnChanges {
  
  intervalValidator: ValidatorFn = (fg: FormGroup) => {
    const from: TrackerRecord = fg.get('intervalFrom').value;
    const to: TrackerRecord = fg.get('intervalTo').value;

    if(isBefore(new Date(to.date), new Date(from.date))){
      fg.get('intervalTo').setErrors({ toIsBeforeFrom: true });
    } else{
      fg.get('intervalTo').setErrors(null);
    }

    if(isAfter(new Date(from.date), new Date(to.date))){
      fg.get('intervalFrom').setErrors({ fromIsAfterTo: true });
    } else{
      fg.get('intervalFrom').setErrors(null);
    }

    if(from === to){
      fg.get('intervalFrom').setErrors({ sameFromAndTo: true });
      fg.get('intervalTo').setErrors({ sameFromAndTo: true });
    }
    else{
      fg.get('intervalFrom').setErrors(null);
      fg.get('intervalTo').setErrors(null);
    }

    return from !== null && to !== null && isBefore(new Date(from.date), new Date(to.date))?null:{interval: true};
  }

  @Input() tracker?: Tracker;
  @Input() filteredRecords: TrackerRecord[];
  @ViewChild('chart', {static: false}) charts: ChartComponent; 
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngAfterViewInit(): void{
    this.initCustomChart(this.tracker.records.sort((r1, r2) => compareDesc(new Date(r1.date), new Date(r2.date))));
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.filteredRecords.currentValue !== changes.filteredRecords.previousValue){
      this.initCustomChart(this.filteredRecords)
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      intervalFrom: [this.tracker.records.length > 0? this.tracker.records[this.tracker.records.length-1]: null] ,
      intervalTo: [this.tracker.records.length > 0? this.tracker.records[0]: null]
    }, { validators: [this.intervalValidator]});

  }
  selectChange(){
    if(this.form.valid){
      this.initCustomChart(this.filteredRecords);
    }
  }
  windowResize(){
    this.initCustomChart(this.filteredRecords);
  }
  resetChartInterval(){
    this.form.setValue({ 
      intervalFrom: this.tracker.records.length > 0? this.tracker.records[this.tracker.records.length-1]: null,
      intervalTo: this.tracker.records.length > 0? this.tracker.records[0]: null
    });
    this.initCustomChart(this.filteredRecords);
  }
  private initCustomChart(data: TrackerRecord[]){
    let dataPoints: ChartCoordinate[] = [];
    // for(let i = 0; i < 30; i++){
    //   dataPoints.push({x: Math.floor(Math.random()*100), y: Math.floor(Math.random()*600)})
    // }
    // let from = this.form.get("intervalFrom").value as TrackerRecord;
    // let to = this.form.get("intervalTo").value as TrackerRecord;
    // let data = this.tracker.records.filter(r => isWithinInterval(new Date(r.date), {start: new Date(from.date), end: new Date(to.date)})).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    for(let rec of data){
      dataPoints.push({ x: differenceInSeconds(new Date(rec.date), new Date(this.tracker.records[0].date)), y: rec.amount as number });
    }
    let chartOptions: ChartOptions = new ChartOptions(
      // Canvas
      { 
        height: "350px",
        width: "100%",
        margin: 25,
        backgroundColor: "#00000000"
      },
      // xAxis
      {
        title: "Tijd",
        titleAlignment: 'right',
        titleFontSize: 20,
        thickness: 2
      },
      // yAxis
      {
        title: this.tracker.unitType.longName,
        titleAlignment: 'right',
        titleFontSize: 20,
        thickness: 2,
        suffix: this.tracker.unitType.shortName
      },
      // Graph
      {
        pointRadius: 8,
        pointStrokeColor: this.tracker.color,
        pointFillColor: this.tracker.color,
        lineColor: this.tracker.color,
        fontSize: 15,
        tooltipFontSize: 20
      },
      dataPoints);
    this.charts.initChart(chartOptions)
  }
  compareFn: ((f1: TrackerRecord, f2: TrackerRecord) => boolean) | null = this.compareByValue;

  compareByValue(f1: TrackerRecord, f2: TrackerRecord) { 
    return f1 && f2 && f1.id === f2.id; 
  }

}
