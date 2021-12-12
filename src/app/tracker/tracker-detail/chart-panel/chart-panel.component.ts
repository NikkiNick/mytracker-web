import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent } from 'src/app/shared/graphs/chart/chart.component.js';
import { Tracker } from '../../tracker.model.js';
import { round } from 'lodash';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TrackerRecord } from 'src/app/tracker-record/tracker-record.model.js';
import { DatePipe } from '@angular/common';
import { ChartConfig } from 'src/app/shared/graphs/chart/chart-config.js';
import { ChartDataPoint } from 'src/app/shared/graphs/canvas/canvas.types.js';


@Component({
  selector: 'app-chart-panel',
  templateUrl: './chart-panel.component.html',
  styleUrls: ['./chart-panel.component.scss']
})
export class ChartPanelComponent implements OnChanges, AfterViewInit {
  @Input() tracker?: Tracker;
  @Input() filteredRecords: TrackerRecord[];
  @Input() selectedDisplayType: 'amount' | 'average' = 'amount';
  @ViewChild('chart', { static: false }) charts: ChartComponent;
  form: FormGroup;
  chartDisplayOptions: { label: string, selected: boolean }[] = [];

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {
    this.form = this.fb.group({});
    this.chartDisplayOptions.push({ label: "Show average line", selected: true });
    this.chartDisplayOptions.push({ label: "Show X-axis values", selected: true });
    this.chartDisplayOptions.push({ label: "Show Y-axis values", selected: true });
    this.chartDisplayOptions.push({ label: "Show helper lines", selected: true });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      (!changes.filteredRecords?.firstChange && changes.filteredRecords?.currentValue !== changes.filteredRecords?.previousValue) || 
      (!changes.selectedDisplayType?.firstChange && changes.selectedDisplayType?.currentValue !== changes.selectedDisplayType?.previousValue)) {
      this.displayChart();
    }
  }

  ngAfterViewInit(): void {
    this.displayChart();
  }
  toggleDisplayOption(option: { label: string, selected: boolean }): void{
    option.selected = !option.selected;
    this.displayChart();
  }
	displayChart(): void {
    if (this.form.valid) {
      const data: ChartDataPoint[] = [];
      // FormData
      const options_showAverage = this.chartDisplayOptions[0].selected;
      const options_showAxisValuesX = this.chartDisplayOptions[1].selected;
      const options_showAxisValuesY = this.chartDisplayOptions[2].selected;
      const options_showHelpers = this.chartDisplayOptions[3].selected;
      // Datapoints
      switch (this.selectedDisplayType) {
        case 'amount':
          for (const rec of this.filteredRecords) {
            const dataPoint: ChartDataPoint = {
              original: { x: new Date(rec.date).getTime(), y: rec.amount as unknown as number },
              display: { x: this.datePipe.transform(new Date(rec.date), "dd/MM/yyyy"), y: rec.amount.toString() }
            };
            data.push(dataPoint);
          }
          break;
        case 'average':
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
      const chartOptions: ChartConfig = new ChartConfig(
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
            showAxisValues: options_showAxisValuesX,
            axisValuesTextOptions: {
              fontSize: 12,
            },
            marginFromAxis: 5
          },
          helperOptions: {
            showHelperLines: options_showHelpers
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
            showAxisValues: options_showAxisValuesY,
            axisValuesTextOptions: {
              fontSize: 12
            },
            marginFromAxis: 5
          },
          helperOptions: {
            showHelperLines: options_showHelpers
          }
        },
        // Graph
        {
          margin: 20,
          textOptions: {
            fontSize: 15
          },
          tooltipOptions: {
            rectOptions: {
              fillColor: this.tracker.color
            },
            marginFromPoint: 20
          }
		},
		{ // Chart
          dataCircleOptions: {
            radius: 8,
            fillColor: this.tracker.color,
          },
          averageOptions: {
            showAverage: options_showAverage,
          }
          // showAverage: this.form.get('displayBy').value === 'Amount' ? false : true
        },
        data);
      // Init chart
      this.charts.init(chartOptions);
    }
  }
  compareByValue(f1: TrackerRecord, f2: TrackerRecord): boolean {
    return f1 && f2 && f1.id === f2.id;
  }
}
