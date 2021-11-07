import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BudgetRecordType } from '../../budget-record/budget-record-type.enum';
import { BudgetRecord } from '../../budget-record/budget-record.model';
import { BudgetTracker } from '../../budget-tracker.model';

@Component({
	selector: 'app-plot-panel',
	templateUrl: './plot-panel.component.html',
	styleUrls: ['./plot-panel.component.scss']
})
export class PlotPanelComponent implements OnInit, OnChanges {

	@Input() tracker: BudgetTracker;
	@Input() filteredRecords: BudgetRecord[];

	incomeRecordsPlotData: { percentile: number, totalAmount: number }; 
	expenseRecordsPlotData: { percentile: number, totalAmount: number };
	totalRecordsPlotData: number;

	constructor() { }

	ngOnInit(): void {
		this.generateIncomeExpensePlot();
	}
	
	ngOnChanges(changes: SimpleChanges) {
		if (!changes.filteredRecords.firstChange && changes.filteredRecords.currentValue !== changes.filteredRecords.previousValue) {
			this.generateIncomeExpensePlot();
		}
	}
	private generateIncomeExpensePlot() {
		let incomeTotalAmount = 0;
		let expenseTotalAmount = 0;
		const incomeRecords = this.filteredRecords.filter(r => r.type === BudgetRecordType.INCOME);
		const expenseRecords = this.filteredRecords.filter(r => r.type === BudgetRecordType.EXPENSE);
		incomeRecords.map(r => r.amount).forEach(a => incomeTotalAmount += a );
		expenseRecords.map(r => r.amount).forEach(a => expenseTotalAmount += a );

		let totalAmount = incomeTotalAmount + expenseTotalAmount;
		this.totalRecordsPlotData = incomeTotalAmount - expenseTotalAmount;
		this.incomeRecordsPlotData = { percentile: ( incomeTotalAmount / totalAmount ) * 100, totalAmount: incomeTotalAmount };
		this.expenseRecordsPlotData = { percentile: ( expenseTotalAmount / totalAmount ) * 100, totalAmount: expenseTotalAmount };
	}
}
