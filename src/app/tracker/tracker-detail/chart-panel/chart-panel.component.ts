import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartOptions } from 'src/app/shared/chart/chart-options.model.js';
import { ChartComponent } from 'src/app/shared/chart/chart.component.js';
import { Tracker } from '../../tracker.model.js';
import { compareDesc, differenceInSeconds, isAfter, isBefore } from 'date-fns';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { TrackerRecord } from 'src/app/tracker-record/tracker-record.model.js';
import { ChartCoordinate } from 'src/app/shared/chart/chart.types.js';


@Component({
    selector: 'app-chart-panel',
    templateUrl: './chart-panel.component.html',
    styleUrls: ['./chart-panel.component.scss']
})
export class ChartPanelComponent implements OnInit, OnChanges, AfterViewInit {
    constructor(private fb: FormBuilder) {
    }

  @Input() tracker?: Tracker;
  @Input() filteredRecords: TrackerRecord[];
  @ViewChild('chart', { static: false }) charts: ChartComponent;
  form: FormGroup;

  ngOnChanges(changes: SimpleChanges) {
      if (changes.filteredRecords.currentValue !== changes.filteredRecords.previousValue) {
          //this.initCustomChart(this.filteredRecords);
          this.changeDisplay();
      }
  }

  ngAfterViewInit(): void {
    //this.initCustomChart(this.tracker.records.sort((r1, r2) => compareDesc(new Date(r1.date), new Date(r2.date))));
    this.changeDisplay();
  }

  ngOnInit(): void {
      this.form = this.fb.group({
          displayBy: ['Amount', []]
      });
  }
  changeDisplay() {
      if (this.form.valid) {
          let data: ChartCoordinate[] = [];
            switch(this.form.get('displayBy').value){
                case 'Amount':
                    for (const rec of this.filteredRecords) {
                        data.push({ x: differenceInSeconds(new Date(rec.date), new Date(this.filteredRecords[0].date)), y: rec.amount as unknown as number });
                    }
                    break;
                case 'Average':
                    for (let i = 0; i < this.filteredRecords.length; i++) {
                        if(i < this.filteredRecords.length-1){
                            const diff = TrackerRecord.calculateDifference(this.filteredRecords[i], this.filteredRecords[i+1]);
                            data.push({ x: differenceInSeconds(new Date(this.filteredRecords[i].date), new Date(this.filteredRecords[0].date)), y: diff.averageDiff });
                        }
                    }
                    break;
            }
            this.initCustomChart(data);
      }
  }
  windowResize() {
      this.changeDisplay();
  }

  private initCustomChart(data: ChartCoordinate[]) {
      const dataPoints: ChartCoordinate[] = [];
      // for(let i = 0; i < 30; i++){
      //   dataPoints.push({x: Math.floor(Math.random()*100), y: Math.floor(Math.random()*600)})
      // }
      // let from = this.form.get("intervalFrom").value as TrackerRecord;
      // let to = this.form.get("intervalTo").value as TrackerRecord;
      // let data = this.tracker.records.filter(r => isWithinInterval(new Date(r.date), {start: new Date(from.date), end: new Date(to.date)})).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    //   for (const rec of data) {
    //       dataPoints.push({ x: differenceInSeconds(new Date(rec.date), new Date(data[0].date)), y: rec.amount as number });
    //   }
      const chartOptions: ChartOptions = new ChartOptions(
      // Canvas
          {
              height: '350px',
              width: '100%',
              margin: 25,
              backgroundColor: '#00000000'
          },
          // xAxis
          {
              title: 'Tijd',
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
              tooltipFontSize: 20,
              showAverage: this.form.get("displayBy").value === "Amount" ? false : true
          },
          data);
      this.charts.initChart(chartOptions);
  }

  compareByValue(f1: TrackerRecord, f2: TrackerRecord) {
      return f1 && f2 && f1.id === f2.id;
  }
}
