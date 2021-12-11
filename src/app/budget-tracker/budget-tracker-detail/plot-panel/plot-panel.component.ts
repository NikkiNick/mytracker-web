import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { StackedBarData } from 'src/app/shared/graphs/canvas/canvas.types';
import { StackedBarChartConfig } from 'src/app/shared/graphs/stacked-bar-chart/stacked-bar-chart-config';
import { StackedBarChartComponent } from 'src/app/shared/graphs/stacked-bar-chart/stacked-bar-chart.component';
import { BudgetRecordType } from '../../budget-record/budget-record-type.enum';
import { BudgetRecord } from '../../budget-record/budget-record.model';
import { BudgetTracker } from '../../budget-tracker.model';

@Component({
  selector: 'app-plot-panel',
  templateUrl: './plot-panel.component.html',
  styleUrls: ['./plot-panel.component.scss']
})
export class PlotPanelComponent implements OnChanges, AfterViewInit {
  @ViewChild('chart', { static: false }) charts: StackedBarChartComponent;
	@Input() tracker: BudgetTracker;
	@Input() filteredRecords: BudgetRecord[];

  ngAfterViewInit(): void {
    this.displayStackBarChart();
  }

	ngOnChanges(changes: SimpleChanges): void {
    if (!changes.filteredRecords.firstChange && changes.filteredRecords.currentValue !== changes.filteredRecords.previousValue) {
      this.displayStackBarChart();
    }
	}
  displayStackBarChart(): void {
		const data: StackedBarData[] = [];
		const incomeRecords = this.filteredRecords.filter((r) => r.type === BudgetRecordType.INCOME);
		const expenseRecords = this.filteredRecords.filter((r) => r.type === BudgetRecordType.EXPENSE);
		data.push({ name: "income", stacks: [] } as StackedBarData);
		this.groupByCategory(incomeRecords, rec => rec.category.name).forEach((v: BudgetRecord[], k: string) => {
			const total = v.map(rec => rec.amount).reduce((rec1, rec2) => rec1 + rec2, 0);
			const color = v[0].category.color;
			data[0].stacks.push({ category: k, amount: total, color: color});
		});
    data[0].stacks.sort((s1, s2) => s1.category.localeCompare(s2.category));
		data.push({ name: "expenses", stacks: [] } as StackedBarData);
		this.groupByCategory(expenseRecords, rec => rec.category.name).forEach((v: BudgetRecord[], k: string) => {
			const total = v.map(rec => rec.amount).reduce((rec1, rec2) => rec1 + rec2, 0);
			const color = v[0].category.color;
			data[1].stacks.push({ category: k, amount: total, color: color});
		});
    data[1].stacks.sort((s1, s2) => s1.category.localeCompare(s2.category));
	
		// Chart options config
		const chartOptions: StackedBarChartConfig = new StackedBarChartConfig(
		{ // Canvas
			height: '200px',
			width: '100%',
			margin: 10,
			backgroundColor: '#00000000'
		},
		{ // xAxis
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
			showAxisValues: false,
			axisValuesTextOptions: {
				fontSize: 12,
			},
			marginFromAxis: 5
			},
		},
		{ // yAxis
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
			showAxisValues: true,
			axisValuesTextOptions: {
				fontSize: 14,
				fontWeight: "bold"
			},
			marginFromAxis: 20
			},
		},
		{ // Graph
			margin: 20,
			textOptions: {
			  fontSize: 15
			},
      tooltipOptions: {
        textOptions: {
          fontSize: 20,
          fontWeight: "bold"
        },
        rectOptions: {
          fillColor: this.tracker.color,
          cornerRadius: 5,
          shadowColor: "gray",
          shadowBlur: 15
        },
        padding: 10,
        marginFromPoint: 10
      },
		},
		{ // Stacked Bar Chart
      totals: {
        showTotals: true,
        suffix: this.tracker.currency,
        textOptions: {
          baseLine: "bottom",
          fontSize: 18,
          fontWeight: "bold"
        }
      },
		},
		data);
		// Init chart
		this.charts.init(chartOptions);
  }
  private groupByCategory(list, keyGetter): Map<string, BudgetRecord[]> {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
            collection.push(item);
         }
    });
    return map;
  }
}
