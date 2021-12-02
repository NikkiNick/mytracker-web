import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartDataPoint, ChartOptions } from 'src/app/shared/chart/chart-options.model.js';
import { ChartComponent } from 'src/app/shared/chart/chart.component.js';
import { Tracker } from '../../tracker.model.js';
import { round } from 'lodash';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TrackerRecord } from 'src/app/tracker-record/tracker-record.model.js';
import { ChartCoordinate } from 'src/app/shared/chart/chart.types.js';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-chart-panel',
  templateUrl: './chart-panel.component.html',
  styleUrls: ['./chart-panel.component.scss']
})
export class ChartPanelComponent implements OnChanges, AfterViewInit {
  @Input() tracker?: Tracker;
  @Input() filteredRecords: TrackerRecord[];
  @ViewChild('chart', { static: false }) charts: ChartComponent;
  form: FormGroup;

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {
    this.form = this.fb.group({
      displayBy: [ 'Amount', [] ],
      options_showAverage: [ true, [] ],
      options_showAxisValuesX: [ true, [] ],
      options_showAxisValuesY: [ true, [] ],
      options_showHelpers: [ true, [] ]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.filteredRecords.firstChange && changes.filteredRecords.currentValue !== changes.filteredRecords.previousValue) {
      this.displayChart();
    }
  }

  ngAfterViewInit(): void {
    this.displayChart();
  }

	displayChart(): void {
    console.log("displaying chart");
    if (this.form.valid) {
      const data: ChartDataPoint[] = [];
      // FormData
      const displayBy_formValue = this.form.get('displayBy').value;
      const options_showAverage_formValue = this.form.get('options_showAverage').value;
      const options_showAxisValuesX_formValue = this.form.get('options_showAxisValuesX').value;
      const options_showAxisValuesY_formValue = this.form.get('options_showAxisValuesY').value;
      const options_showHelpers_formValue = this.form.get('options_showHelpers').value;
      // Datapoints
      switch (displayBy_formValue) {
        case 'Amount':
          for (const rec of this.filteredRecords) {
            const dataPoint: ChartDataPoint = {
              original: { x: new Date(rec.date).getTime(), y: rec.amount as unknown as number },
              display: { x: this.datePipe.transform(new Date(rec.date), "dd/MM/yyyy"), y: rec.amount.toString() }
            };
            data.push(dataPoint);
          }
          break;
        case 'Average':
          for (let i = 0; i < this.filteredRecords.length; i++) {
            if (i < this.filteredRecords.length - 1) {
              const diff = TrackerRecord.calculateDifference(this.filteredRecords[i], this.filteredRecords[i + 1]);
              const dataPoint: ChartDataPoint = {
                original: { x: new Date(this.filteredRecords[i].date).getTime(), y: round(diff.averageDiff, 2) },
                display: { x: this.datePipe.transform(new Date(this.filteredRecords[i].date), "dd/MM/yyyy"), y: round(diff.averageDiff, 2) }
              };
              data.push(dataPoint);
            }
          }
          break;
      }

      // Chart options config
      const chartOptions: ChartOptions = new ChartOptions(
        // Canvas
        {
          height: '600px',
          width: '100%',
          margin: 10,
          backgroundColor: '#00000000'
        },
        // xAxis
        {
          title: 'Tijd',
          axisOptions: {
            axisLineOptions: {
              thickness: 2
            },
            showAxisIntersect: false,
            arrowOptions: {
              arrowSize: 15
            }
          },
          axisValues: {
            showAxisValues: options_showAxisValuesX_formValue,
            axisValuesTextOptions: {
              fontSize: 12,
            },
            marginFromAxis: 5
          },
          helperOptions: {
            showHelperLines: options_showHelpers_formValue
          }
        },
        // yAxis
        {
          title: this.tracker.unitType.longName,
          suffix: this.tracker.unitType.shortName,
          axisOptions: {
            axisLineOptions: {
              thickness: 2
            },
            arrowOptions: {
              arrowSize: 15
            },
            showAxisIntersect: false,
          },
          axisValues: {
            showAxisValues: options_showAxisValuesY_formValue,
            axisValuesTextOptions: {
              fontSize: 12
            },
            marginFromAxis: 5
          },
          helperOptions: {
            showHelperLines: options_showHelpers_formValue
          }
        },
        // Graph
        {
          margin: 20,
          textOptions: {
            fontSize: 15
          },
          dataCircleOptions: {
            radius: 8,
            fillColor: this.tracker.color,
          },
          tooltipOptions: {
            textOptions: {
              fontSize: 20,
              fontWeight: "bold"
            },
            rectOptions: {
              fillColor: this.tracker.color,
              cornerRadius: 15,
              shadowColor: "gray",
              shadowBlur: 15
            },
            padding: 10,
            marginFromPoint: 10
          },
          averageOptions: {
            showAverage: options_showAverage_formValue,
          }
          // showAverage: this.form.get('displayBy').value === 'Amount' ? false : true
        },
        data);
      // Init chart
      this.charts.initChart(chartOptions);
    }
  }
  compareByValue(f1: TrackerRecord, f2: TrackerRecord): boolean {
    return f1 && f2 && f1.id === f2.id;
  }
}
