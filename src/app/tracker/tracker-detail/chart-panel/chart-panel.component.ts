import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CanvasOptions, ChartCoordinate, ChartOptions } from 'src/app/shared/chart/chart-options.model.js';
import { ChartComponent } from 'src/app/shared/chart/chart.component.js';
import * as CanvasJS from '../../../../assets/CanvasJS/canvasjs.min.js';
import { Tracker } from '../../tracker.model.js';
import { differenceInDays, differenceInSeconds, isAfter, isBefore, isWithinInterval } from 'date-fns'
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { TrackerRecord } from 'src/app/tracker-record/tracker-record.model.js';


@Component({
  selector: 'app-chart-panel',
  templateUrl: './chart-panel.component.html',
  styleUrls: ['./chart-panel.component.scss']
})
export class ChartPanelComponent implements OnInit, AfterViewInit {
  
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
  @ViewChild('chart', {static: false}) charts: ChartComponent; 
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngAfterViewInit(): void{
    this.initCustomChart();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      intervalFrom: [this.tracker.records.length > 0? this.tracker.records[this.tracker.records.length-1]: null] ,
      intervalTo: [this.tracker.records.length > 0? this.tracker.records[0]: null]
    }, { validators: [this.intervalValidator]});

  }
  selectChange(){
    if(this.form.valid){
      this.initCustomChart();
    }
  }
  windowResize(){
    this.initCustomChart();
  }
  resetChartInterval(){
    this.form.setValue({ 
      intervalFrom: this.tracker.records.length > 0? this.tracker.records[this.tracker.records.length-1]: null,
      intervalTo: this.tracker.records.length > 0? this.tracker.records[0]: null
    });
    this.initCustomChart();
  }
  private initCustomChart(){
    let dataPoints: ChartCoordinate[] = [];
    // for(let i = 0; i < 30; i++){
    //   dataPoints.push({x: Math.floor(Math.random()*100), y: Math.floor(Math.random()*600)})
    // }
    let from = this.form.get("intervalFrom").value as TrackerRecord;
    let to = this.form.get("intervalTo").value as TrackerRecord;
    let data = this.tracker.records.filter(r => isWithinInterval(new Date(r.date), {start: new Date(from.date), end: new Date(to.date)})).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    for(let rec of data){
      dataPoints.push({ x: differenceInSeconds(new Date(rec.date), new Date(this.tracker.records[0].date)), y: rec.amount as number });
    }
    let chartOptions: ChartOptions = new ChartOptions(
      // Canvas
      { 
        width: '100%',
        height: '100%',
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
        pointRadius: 4,
        pointStrokeColor: "blue",
        pointFillColor: "blue",
        lineColor: "#000000",
        fontSize: 15
      },
      dataPoints);
    this.charts.initChart(chartOptions)
  }
  compareFn: ((f1: TrackerRecord, f2: TrackerRecord) => boolean) | null = this.compareByValue;

  compareByValue(f1: TrackerRecord, f2: TrackerRecord) { 
    return f1 && f2 && f1.id === f2.id; 
  }

}
