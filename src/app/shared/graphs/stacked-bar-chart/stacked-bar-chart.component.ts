import { Component } from '@angular/core';
import { config } from 'process';
import { CanvasComponent } from '../canvas/canvas.component';
import { CanvasCoordinate, StackedBarData, StackedBarStack } from '../canvas/canvas.types';
import { StackedBarChartConfig } from './stacked-bar-chart-config';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss']
})
export class StackedBarChartComponent extends CanvasComponent{

  private transformedData: { name: string, stacks: { data: StackedBarStack, width: number }[]}[];
  private overlayContainers: { data: StackedBarStack, width: number, pos: { topLeft: CanvasCoordinate, topRight: CanvasCoordinate, bottomLeft: CanvasCoordinate, bottomRight: CanvasCoordinate} }[] = [];
  private barHeight: number;
  
  init(config: StackedBarChartConfig): void {
    this.transformedData = [];
    this.overlayContainers = [];
    this.barHeight = 0;
    super.initConfig(config);
    this.initData(config.data);
    this.initAxisX();
    this.initAxisY();
    this.initGraph();
    this.initTooltipOverlay();
  }
  initData(data: StackedBarData[]): void {
    // Calculating graph origin (0,0) and dimensions 
    const yLongestValue = this.calculateLongestValue(data.map(p => p.name), this.config.axisY.axisValues.axisValuesTextOptions);
    const xAxisValuesOffset = this.config.axisX.axisValues.showAxisValues ? (this.config.axisX.axisValues.axisValuesTextOptions.fontSize + this.config.axisX.axisValues.marginFromAxis) : 0;
    const yAxisValuesOffset = this.config.axisY.axisValues.showAxisValues ? (yLongestValue + this.config.axisY.axisValues.marginFromAxis) : 0;
    const xOffset = 	(this.config.axisY.title ? this.config.axisY.titleTextOptions.fontSize : 0) + yAxisValuesOffset;
    const yOffset = 	(this.config.axisX.title ? this.config.axisX.titleTextOptions.fontSize : 0) + xAxisValuesOffset;
    const xTotalsSize = this.calculateLongestValue(data.map(d => `${d.stacks.reduce((s1, s2) => s1 + s2.amount, 0).toString()} ${this.config.stackedBarChart.totals.suffix}`), this.config.stackedBarChart.totals.textOptions) + this.config.stackedBarChart.totals.marginFromBar;
    const xTotalSize = this.config.stackedBarChart.totals?.showTotals ? xTotalsSize : 0;
    this.graphOrigin = {
      x: this.config.canvas.margin + xOffset + this.config.graph.margin,
      y: this.canvas.nativeElement.height - this.config.canvas.margin - yOffset - this.config.graph.margin
    };   
    this.graphWidth = this.canvas.nativeElement.width - ((this.config.canvas.margin + this.config.graph.margin)*2) - xOffset - xTotalSize;
    this.graphHeight = this.canvas.nativeElement.height - ((this.config.canvas.margin + this.config.graph.margin)*2) - yOffset;

    // calculate data ranges
    const xRangeMin = 0;
    const xRangeMax = Math.max(...data.map(bar => bar.stacks.reduce((s1, s2) => s1 + s2.amount, 0)));
    const xRangeDiff = (xRangeMax - xRangeMin);
    const xRatio = this.graphWidth / xRangeDiff;

    // Transforming data to fit onto canvas
    for (let barIndex = 0; barIndex < data.length; barIndex++) {
      const bar = { name: data[barIndex].name, stacks: []};
      for(const stack of data[barIndex].stacks){
        const stackWidth = Math.floor(stack.amount * xRatio);
        bar.stacks.push({ data: { category: stack.category, amount: stack.amount, color: stack.color }, width: stackWidth });
      }
      this.transformedData.push(bar);
    }
  }
  private initAxisX(): void {
    // Draw line
    const yLongestValue = this.calculateLongestValue(this.transformedData.map(p => p.name), this.config.axisY.axisValues.axisValuesTextOptions);
    const xOffset = this.config.axisY.axisValues.showAxisValues ? (yLongestValue + this.config.axisY.axisValues.marginFromAxis) : 0;
    const xIntersectSize = this.config.axisX.axisOptions.showAxisIntersect ? xOffset : 0;
    const yOffset = (this.config.axisX.title ? this.config.axisX.titleTextOptions.fontSize : 0) +
            (this.config.axisX.axisValues.showAxisValues ? (this.config.axisX.axisValues.axisValuesTextOptions.fontSize + this.config.axisX.axisValues.marginFromAxis) : 0);
    const startCoordinate: CanvasCoordinate = {
      x: this.graphOrigin.x - this.config.graph.margin - xIntersectSize,
      y: this.canvas.nativeElement.height - this.config.canvas.margin - yOffset
    };
    const endCoordinate: CanvasCoordinate = {
      x: this.canvas.nativeElement.width - this.config.canvas.margin,
      y: startCoordinate.y
    };
    this.drawLine(this.ctx, startCoordinate, endCoordinate, this.config.axisX.axisOptions.axisLineOptions);
    // Draw line arrow
    if(this.config.axisX.axisOptions.arrowOptions.showArrow){
      this.ctx.save();
      this.ctx.moveTo(endCoordinate.x, endCoordinate.y);
      this.ctx.lineTo(endCoordinate.x - this.config.axisX.axisOptions.arrowOptions.arrowSize, endCoordinate.y - (this.config.axisX.axisOptions.arrowOptions.arrowSize/2));
      this.ctx.lineTo(endCoordinate.x - this.config.axisX.axisOptions.arrowOptions.arrowSize, endCoordinate.y + (this.config.axisX.axisOptions.arrowOptions.arrowSize/2));
      this.ctx.closePath();
      this.ctx.fillStyle = this.config.axisX.axisOptions.axisLineOptions.strokeColor;
      this.ctx.fill();
      this.ctx.restore();
    }
    // Draw title
    if(this.config.axisX.title){
      const xAxisTitleCoordinate: CanvasCoordinate = { x: null, y: null };
      xAxisTitleCoordinate.y = this.canvas.nativeElement.height - this.config.canvas.margin - this.config.axisX.titleTextOptions.fontSize + 5;
      switch (this.config.axisX.titleTextOptions.alignment) {
        case 'left':
          xAxisTitleCoordinate.x = this.config.canvas.margin;
          break;
        case 'center':
          xAxisTitleCoordinate.x = this.canvas.nativeElement.width / 2;
          break;
        case 'right':
          xAxisTitleCoordinate.x = this.canvas.nativeElement.width - this.config.canvas.margin - this.config.axisX.axisOptions.arrowOptions.arrowSize - 5;
          break;
      }
      const text = `${this.config.axisX.title}${this.config.axisX.suffix ? ' ('+this.config.axisX.suffix+')':''}`; 
      this.drawText(this.ctx, xAxisTitleCoordinate, text, this.config.axisX.titleTextOptions);
    }
  }
  private initAxisY(): void {
    // Draw line
    const yLongestValue = this.calculateLongestValue(this.transformedData.map(p => p.name), this.config.axisY.axisValues.axisValuesTextOptions);
    const yAxisValuesOffset = this.config.axisY.axisValues.showAxisValues ? (yLongestValue + this.config.axisY.axisValues.marginFromAxis) : 0;
    const yOffset = this.config.axisX.axisValues.showAxisValues ? (this.config.axisX.axisValues.axisValuesTextOptions.fontSize + this.config.axisX.axisValues.marginFromAxis) : 0;
    const yIntersectSize = this.config.axisY.axisOptions.showAxisIntersect ? yOffset : 0;
    const xOffset = (this.config.axisY.title ? this.config.axisY.titleTextOptions.fontSize : 0) + yAxisValuesOffset;
	
    const startCoordinate: CanvasCoordinate = {
      x: this.graphOrigin.x - this.config.graph.margin,
      y: this.config.canvas.margin
    };
    const endCoordinate: CanvasCoordinate = {
      x: this.graphOrigin.x - this.config.graph.margin,
      y: this.graphOrigin.y + this.config.graph.margin + yIntersectSize
    };
    this.drawLine(this.ctx, startCoordinate, endCoordinate, this.config.axisY.axisOptions.axisLineOptions);
    // Draw line arrow
    if(this.config.axisY.axisOptions.arrowOptions.showArrow){
      this.ctx.save();
      this.ctx.moveTo(startCoordinate.x, startCoordinate.y);
      this.ctx.lineTo(startCoordinate.x - (this.config.axisY.axisOptions.arrowOptions.arrowSize/2), startCoordinate.y + this.config.axisY.axisOptions.arrowOptions.arrowSize);
      this.ctx.lineTo(startCoordinate.x + (this.config.axisY.axisOptions.arrowOptions.arrowSize/2), startCoordinate.y + this.config.axisY.axisOptions.arrowOptions.arrowSize);
      this.ctx.closePath();
      this.ctx.fillStyle = this.config.axisY.axisOptions.axisLineOptions.strokeColor;
      this.ctx.fill();
      this.ctx.restore();
    }
    // Draw title
    if(this.config.axisY.title){
      const yAxisTitleCoordinate: CanvasCoordinate = { x: null, y: null };
      yAxisTitleCoordinate.x = this.graphOrigin.x - this.config.graph.margin - xOffset - this.config.axisY.axisValues.marginFromAxis;
      switch (this.config.axisY.titleTextOptions.alignment) {
        case 'left':
          yAxisTitleCoordinate.y = this.canvas.nativeElement.height - this.config.canvas.margin;
          break;
        case 'center':
          yAxisTitleCoordinate.y = this.canvas.nativeElement.height / 2;
          break;
        case 'right':
          yAxisTitleCoordinate.y = this.config.canvas.margin + this.config.axisY.axisOptions.arrowOptions.arrowSize + 5;
          break;
      }
      const text = `${this.config.axisY.title}${this.config.axisY.suffix ? ' ('+this.config.axisY.suffix+')':''}`;
      this.drawText(this.ctx, yAxisTitleCoordinate, text, this.config.axisY.titleTextOptions);
    }
  }
  private initGraph(): void{
    this.barHeight = (this.graphHeight - (this.config.stackedBarChart.gutterSize * (this.transformedData.length-1))) / this.transformedData.length;
    let currentYLevel = this.graphOrigin.y - this.barHeight;
    
    for(const bar of this.transformedData){
      let currentXLevel = this.graphOrigin.x;
      // Draw individual stacks
      for(const stack of bar.stacks){
        // Stack
        this.drawRect(this.ctx, { x: currentXLevel, y: currentYLevel}, { height: this.barHeight, width: stack.width, fillColor: stack.data.color, lineThickness: this.config.graph.tooltipOptions.rectOptions.lineThickness }); 
        this.overlayContainers.push({
          data: {
            category: stack.data.category, 
            color: stack.data.color,
            amount: stack.data.amount
          },
          width: stack.width,
          pos: { 
            topLeft: { x: Math.floor(currentXLevel), y: Math.floor(currentYLevel)},
            topRight: { x: Math.floor(currentXLevel + stack.width), y: Math.floor(currentYLevel) },
            bottomLeft: { x: Math.floor(currentXLevel), y: Math.floor(currentYLevel + this.barHeight) },
            bottomRight: { x: Math.floor(currentXLevel + stack.width), y: Math.floor(currentYLevel + this.barHeight)}
          }
        });
        currentXLevel += stack.width;
      }
      // Draw axisvalues (Y-axis)
      if(this.config.axisY.axisValues.showAxisValues){
        const axisValue = bar.name;
        const axisValueCoordinate: CanvasCoordinate = {
          x: this.graphOrigin.x - this.config.graph.margin - this.config.axisY.axisValues.marginFromAxis,
          y: currentYLevel + this.barHeight / 2,
        };
        this.drawText(this.ctx, axisValueCoordinate, axisValue, this.config.axisY.axisValues.axisValuesTextOptions);
      }
      // Draw totals
      if(this.config.stackedBarChart.totals.showTotals){
        const barTotal = bar.stacks.reduce((s1, s2) => s1 + s2.data.amount, 0).toString();
        const totalText = `${barTotal} ${this.config.stackedBarChart.totals.suffix}`;
        const barTotalCoordinate: CanvasCoordinate = {
          x: this.graphOrigin.x + this.graphWidth + this.config.stackedBarChart.totals.marginFromBar,
          y: currentYLevel + this.barHeight / 2
        };
        this.drawText(this.ctx, barTotalCoordinate, totalText, this.config.stackedBarChart.totals.textOptions);
      }
      currentYLevel -= this.barHeight + this.config.stackedBarChart.gutterSize;
    }
  }
  private initTooltipOverlay(): void{
    this.ctxOverlay.canvas.addEventListener('mousemove', (e) => {
      this.ctxOverlay.clearRect(0, 0, this.ctxOverlay.canvas.width, this.ctxOverlay.canvas.height);
      const areaDetected = this.overlayContainers.find(c => e.offsetX >= c.pos.bottomLeft.x && e.offsetX <= c.pos.bottomRight.x && e.offsetY >= c.pos.topLeft.y && e.offsetY <= c.pos.bottomLeft.y);
      if(areaDetected){
        this.config.graph.tooltipOptions.rectOptions.fillColor = areaDetected.data.color;
        const tooltipText = [areaDetected.data.category, `${areaDetected.data.amount} ${this.config.stackedBarChart.totals.suffix}`];
        this.drawRect(this.ctxOverlay, { x: areaDetected.pos.topLeft.x - 3, y: areaDetected.pos.topLeft.y - 3 }, { width: areaDetected.width+6, height: this.barHeight+6, fillColor: areaDetected.data.color, shadowBlur: 5, shadowColor: "gray", lineThickness: 2});
        this.drawTooltip(this.ctxOverlay, { x: e.offsetX, y: e.offsetY }, tooltipText, this.config.graph.tooltipOptions);
      }
    });
  }
	// Draw tooltips
	// this.ctxOverlay.canvas.addEventListener('mousemove', (e) => {
	// const transformedDatapointFound = this.transformedDatapoints
	// 	.find((t) => (this.calculateDistance(e.offsetX, e.offsetY, t.transformed.x, t.transformed.y) < this.config.chart.dataCircleOptions.radius * 2));
	// if (transformedDatapointFound) {      
	// 	this.ctxOverlay.clearRect(0, 0, this.ctxOverlay.canvas.width, this.ctxOverlay.canvas.height);
	// 	// Highlight helper
	// 	// Draw Helperlines (yaxis)
	// 	if (this.config.axisY.helperOptions.showHelperLines) {
	// 	const startCoordinateHelperY: CanvasCoordinate = {
	// 		x: this.graphOrigin.x - this.config.graph.margin,
	// 		y: transformedDatapointFound.transformed.y
	// 	};
	// 	const endCoordinateHelperY: CanvasCoordinate = {
	// 		x: transformedDatapointFound.transformed.x,
	// 		y: transformedDatapointFound.transformed.y
	// 	};
	// 	const helperOptionsY: LineOptions = {
	// 		thickness: this.config.axisY.helperOptions.helperLineOptions.thickness,
	// 		strokeColor: "black",
	// 		type: "dashed"
	// 	};
	// 	this.drawLine(this.ctxOverlay, startCoordinateHelperY, endCoordinateHelperY, helperOptionsY);
	// 	}
	// 	// Draw Helperlines (xAxis)
	// 	if (this.config.axisX.helperOptions.showHelperLines) {
	// 	const startCoordinateHelperX: CanvasCoordinate = {
	// 		x: transformedDatapointFound.transformed.x,
	// 		y: this.graphOrigin.y + this.config.graph.margin
	// 	};
	// 	const endCoordinateHelperX: CanvasCoordinate = {
	// 		x: transformedDatapointFound.transformed.x,
	// 		y: transformedDatapointFound.transformed.y
	// 	};
	// 	const helperOptionsX: LineOptions = {
	// 		thickness: this.config.axisX.helperOptions.helperLineOptions.thickness,
	// 		strokeColor: "black",
	// 		type: "dashed"
	// 	};
	// 	this.drawLine(this.ctxOverlay, startCoordinateHelperX, endCoordinateHelperX, helperOptionsX);
	// 	}
	// 	// Circle tooltip
	// 	const circleCoordinate: CanvasCoordinate = { x: transformedDatapointFound.transformed.x, y: transformedDatapointFound.transformed.y };
	// 	const circleOptions: CircleOptions = {
	// 	radius: this.config.chart.dataCircleOptions.radius * 1.5,
	// 	fillColor: this.config.chart.dataCircleOptions.fillColor,
	// 	lineThickness: this.config.chart.dataCircleOptions.lineThickness * 1.5
	// 	};
	// 	this.drawCircle(this.ctxOverlay, circleCoordinate, circleOptions);

	// 	// Rectangle tooltip
	// 	const tooltipText = [
	// 	`${transformedDatapointFound.display.y}${this.config.axisY.suffix ? ' '+this.config.axisY.suffix : ''}`,
	// 	transformedDatapointFound.display.x
	// 	];
	// 	const tooltipCoordinate: CanvasCoordinate = {
	// 	x: transformedDatapointFound.transformed.x,
	// 	y: transformedDatapointFound.transformed.y + this.config.chart.dataCircleOptions.radius + this.config.chart.tooltipOptions.marginFromPoint
	// 	};
	// 	const tooltipTextOptions = this.config.chart.tooltipOptions.textOptions;
	// 	const tooltipRectOptions = this.config.chart.tooltipOptions.rectOptions;
	// 	const tooltipPadding = this.config.chart.tooltipOptions.padding;
	// 	const tooltipMarginFromPoint = this.config.chart.tooltipOptions.marginFromPoint;
	// 	this.drawTooltip(this.ctxOverlay, tooltipCoordinate, tooltipText, { textOptions: tooltipTextOptions, rectOptions: tooltipRectOptions, padding: tooltipPadding, marginFromPoint: tooltipMarginFromPoint });
	// } 
	// else {
	// 	this.ctxOverlay.clearRect(0, 0, this.ctxOverlay.canvas.width, this.ctxOverlay.canvas.height);
	// }
}
