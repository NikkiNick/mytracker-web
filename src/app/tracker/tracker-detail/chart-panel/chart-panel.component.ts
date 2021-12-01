import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartOptions } from 'src/app/shared/chart/chart-options.model.js';
import { ChartComponent } from 'src/app/shared/chart/chart.component.js';
import { Tracker } from '../../tracker.model.js';
import { round } from 'lodash';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TrackerRecord } from 'src/app/tracker-record/tracker-record.model.js';
import { ChartCoordinate } from 'src/app/shared/chart/chart.types.js';


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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      displayBy: ['Amount', []]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.filteredRecords.firstChange && changes.filteredRecords.currentValue !== changes.filteredRecords.previousValue) {
      this.changeDisplay();
    }
  }

  ngAfterViewInit(): void {
    this.changeDisplay();
  }

	changeDisplay(): void {
    if (this.form.valid) {
      const data: ChartCoordinate[] = [];
      switch (this.form.get('displayBy').value) {
        case 'Amount':
          for (const rec of this.filteredRecords) {
            data.push({ x: new Date(rec.date).getTime(), y: rec.amount as unknown as number });
          }
          break;
        case 'Average':
          for (let i = 0; i < this.filteredRecords.length; i++) {
            if (i < this.filteredRecords.length - 1) {
              const diff = TrackerRecord.calculateDifference(this.filteredRecords[i], this.filteredRecords[i + 1]);
              data.push({ x: new Date(this.filteredRecords[i].date).getTime(), y: round(diff.averageDiff, 2) });
            }
          }
          break;
      }
      this.initCustomChart(data);
    }
  }
  windowResize(): void {
    this.changeDisplay();
  }

  private initCustomChart(data: ChartCoordinate[]): void {
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
		titleTextOptions: {
			direction: "horizontal",
			alignment: 'center',
			fontSize: 20,
			fontWeight: 'bold',
		},
		axisOptions: {
			axisLineOptions: {
				thickness: 2
			},
			showAxisIntersect: false,
			arrowOptions: {
				showArrow: true,
				arrowSize: 15
			}
		},
		axisValues: {
			showAxisValues: true,
			axisValuesTextOptions: {
				alignment: 'center',
				fontSize: 12,
				fontWeight: "normal",
				direction: "horizontal"
			}
		},
		helperOptions: {
			showHelperLines: true,
			helperLineOptions: {
				type: "dashed",
				strokeColor: "grey",
				thickness: 1
			}
		}
      },
      // yAxis
      {
        title: this.tracker.unitType.longName,
        suffix: this.tracker.unitType.shortName,
		titleTextOptions: {
			alignment: 'center',
			fontSize: 20,
			fontWeight: "bold"
		},
		axisOptions: {
			axisLineOptions: {
				thickness: 2
			},
			arrowOptions: {
				showArrow: true,
				arrowSize: 15
			},
			showAxisIntersect: false,
		},
		axisValues: {
			showAxisValues: false,
			axisValuesTextOptions: {}
		},
		helperOptions: {
			showHelperLines: true,
			helperLineOptions: {
				type: "dashed",
				strokeColor: "grey",
				thickness: 1
			}
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
			strokeColor: "black",
			fillColor: this.tracker.color,
			lineThickness: 2
		},
		dataLineOptions: {
			thickness: 2,
			strokeColor: "black"
		},
		tooltipOptions: {
			textOptions: {
				fontSize: 20,
			},
			rectOptions: {
				fillColor: this.tracker.color,
				cornerRadius: 15,
				shadowColor: "gray",
				shadowBlur: 15
			}
		},
		averageOptions: {
			showAverage: true,
			averageLineOptions: {
				strokeColor: "red",
				thickness: 1
			}
		}
        // showAverage: this.form.get('displayBy').value === 'Amount' ? false : true
      },
      data);
    this.charts.initChart(chartOptions);
  }

  compareByValue(f1: TrackerRecord, f2: TrackerRecord): boolean {
    return f1 && f2 && f1.id === f2.id;
  }
}
