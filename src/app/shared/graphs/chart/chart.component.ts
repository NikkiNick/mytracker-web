import { Component } from '@angular/core';
import { CanvasComponent } from '../canvas/canvas.component';
import { ICanvasConfig } from '../canvas/canvas.config';
import { CanvasCoordinate, LineOptions, CircleOptions, ChartDataPoint, TextOptions, RectOptions } from '../canvas/canvas.types';

/* eslint-disable no-unused-vars */

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent extends CanvasComponent {

  private transformedDatapoints: { transformed: CanvasCoordinate, display: { x: string, y: string }}[];

  init(config: ICanvasConfig): void {
	super.initConfig(config);
	this.initGraphData(config.data);
	this.initAxisX();
	this.initAxisY();
	this.initGraph();
  }

  private initGraphData(data: ChartDataPoint[]): void {
	this.transformedDatapoints = [];
    // Calculating graph origin (0,0) and dimensions 
    const yLongestValue = this.calculateLongestValue(data.map(p => `${p.display.y}${this.config.axisY.suffix ? ' '+this.config.axisY.suffix : ''}`), this.config.axisY.axisValues.axisValuesTextOptions);
    const xAxisValuesOffset = this.config.axisX.axisValues.showAxisValues ? (this.config.axisX.axisValues.axisValuesTextOptions.fontSize + this.config.axisX.axisValues.marginFromAxis) : 0;
    const yAxisValuesOffset = this.config.axisY.axisValues.showAxisValues ? (yLongestValue + this.config.axisY.axisValues.marginFromAxis) : 0;
    const xOffset = 	(this.config.axisY.title ? this.config.axisY.titleTextOptions.fontSize : 0) + yAxisValuesOffset;
    const yOffset = 	(this.config.axisX.title ? this.config.axisX.titleTextOptions.fontSize : 0) + xAxisValuesOffset;
    this.graphOrigin = {
      x: this.config.canvas.margin + xOffset + this.config.graph.margin,
      y: this.canvas.nativeElement.height - this.config.canvas.margin - yOffset - this.config.graph.margin
    };   
    this.graphWidth = this.canvas.nativeElement.width - ((this.config.canvas.margin + this.config.graph.margin)*2) - xOffset;
    this.graphHeight = this.canvas.nativeElement.height - ((this.config.canvas.margin + this.config.graph.margin)*2) - yOffset;

    // calculate data ranges
    const xRangeMin = Math.min(...data.map((d) => d.original.x));
    const xRangeMax = Math.max(...data.map((d) => d.original.x));
    const xRangeDiff = (xRangeMax - xRangeMin);
    const xRatio = this.graphWidth / xRangeDiff;
    const yRangeMin = Math.min(...data.map((d) => d.original.y));
    const yRangeMax = Math.max(...data.map((d) => d.original.y));
    const yRangeDiff = yRangeMax - yRangeMin;
    const yRatio = this.graphHeight / yRangeDiff;
    
    data.sort((a, b) => a.original.x - b.original.x);

    // Transforming data to fit onto canvas
    for (let i = 0; i < data.length; i++) {
      const transformedX = this.graphOrigin.x + Math.floor((data[i].original.x - xRangeMin) * xRatio);
      const transformedY = Math.floor(this.graphOrigin.y + - ((data[i].original.y - yRangeMin) * yRatio));
      this.transformedDatapoints.push(
        {
          transformed: { x: transformedX, y: transformedY },
          display: data[i].display
        });
    }
  }
  private initAxisX(): void {
    // Draw line
    const yLongestValue = this.calculateLongestValue(this.transformedDatapoints.map(p => `${p.display.y}${this.config.axisY.suffix ? ' '+this.config.axisY.suffix : ''}`), this.config.axisY.axisValues.axisValuesTextOptions);
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
    const yLongestValue = this.calculateLongestValue(this.transformedDatapoints.map(p => `${p.display.y}${this.config.axisY.suffix ? ' '+this.config.axisY.suffix : ''}`), this.config.axisY.axisValues.axisValuesTextOptions);
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
    if(this.config.chart.averageOptions.showAverage){
      const startCoordinateAvg: CanvasCoordinate = {
        x: this.transformedDatapoints[0].transformed.x,
        y: this.transformedDatapoints[0].transformed.y
      };
      const endCoordinateAvg: CanvasCoordinate = {
        x: this.transformedDatapoints[this.transformedDatapoints.length-1].transformed.x,
        y: this.transformedDatapoints[this.transformedDatapoints.length-1].transformed.y
      };
      this.drawLine(this.ctx, startCoordinateAvg, endCoordinateAvg, this.config.chart.averageOptions.averageLineOptions);
    }
    for(let i = 0; i < this.transformedDatapoints.length; i++){
      // Draw Helperlines (yaxis)
      if (this.config.axisY.helperOptions.showHelperLines) {
        const startCoordinateHelperY: CanvasCoordinate = {
          x: this.graphOrigin.x - this.config.graph.margin,
          y: this.transformedDatapoints[i].transformed.y
        };
        const endCoordinateHelperY: CanvasCoordinate = {
          x: this.transformedDatapoints[i].transformed.x,
          y: this.transformedDatapoints[i].transformed.y
        };
        this.drawLine(this.ctx, startCoordinateHelperY, endCoordinateHelperY, this.config.axisY.helperOptions.helperLineOptions);
      }
      // Draw Helperlines (xAxis)
      if (this.config.axisX.helperOptions.showHelperLines) {
        const startCoordinateHelperX: CanvasCoordinate = {
          x: this.transformedDatapoints[i].transformed.x,
          y: this.graphOrigin.y + this.config.graph.margin
        };
        const endCoordinateHelperX: CanvasCoordinate = {
          x: this.transformedDatapoints[i].transformed.x,
          y: this.transformedDatapoints[i].transformed.y
        };
        this.drawLine(this.ctx, startCoordinateHelperX, endCoordinateHelperX, this.config.axisX.helperOptions.helperLineOptions);
      }
      // Draw axisValues (xAxis)
      if(this.config.axisX.axisValues.showAxisValues){
		const axisValueCoordinate: CanvasCoordinate = {
			x: this.transformedDatapoints[i].transformed.x,
			y: this.graphOrigin.y + this.config.graph.margin + this.config.axisX.axisValues.marginFromAxis
		};
		const axisValue = `${this.transformedDatapoints[i].display.x}${this.config.axisX.suffix ? ' '+this.config.axisX.suffix : ''}`;
		const axisValueSize = this.ctx.measureText(axisValue).width;
		if((this.transformedDatapoints[i].transformed.x - this.graphOrigin.x < axisValueSize / 2) && (this.graphWidth - this.transformedDatapoints[i].transformed.x > axisValueSize / 2)){
			this.config.axisX.axisValues.axisValuesTextOptions.alignment = "left";
		} else if((this.transformedDatapoints[i].transformed.x - this.graphOrigin.x > axisValueSize / 2) && (this.graphWidth - this.transformedDatapoints[i].transformed.x < axisValueSize / 2)){
			this.config.axisX.axisValues.axisValuesTextOptions.alignment = "right";
		} else {
			this.config.axisX.axisValues.axisValuesTextOptions.alignment = "center";
		}
		this.drawText(this.ctx, axisValueCoordinate, axisValue, this.config.axisX.axisValues.axisValuesTextOptions);
      }
    // Draw axisValues (yAxis)
    if(this.config.axisY.axisValues.showAxisValues){
      const axisValue = `${this.transformedDatapoints[i].display.y}${this.config.axisY.suffix ? ' '+this.config.axisY.suffix : ''}`;
      const axisValueCoordinate: CanvasCoordinate = {
        x: this.graphOrigin.x - this.config.graph.margin - this.config.axisY.axisValues.marginFromAxis,
        y: this.transformedDatapoints[i].transformed.y,
      };
      this.drawText(this.ctx, axisValueCoordinate, axisValue, this.config.axisY.axisValues.axisValuesTextOptions);
    }
    // Draw Connection
    if (i < this.transformedDatapoints.length - 1) {
      const nextTransformed = this.transformedDatapoints[i+1].transformed;
      const startCoordinate: CanvasCoordinate = { x: this.transformedDatapoints[i].transformed.x, y: this.transformedDatapoints[i].transformed.y };
      const endCoordinate: CanvasCoordinate = { x: nextTransformed.x, y: nextTransformed.y };
        
      this.drawLine(this.ctx, startCoordinate, endCoordinate, this.config.chart.dataLineOptions);
      }
      // Draw point
      this.drawCircle(this.ctx, { x: this.transformedDatapoints[i].transformed.x, y: this.transformedDatapoints[i].transformed.y }, this.config.chart.dataCircleOptions);
    }
    // Draw tooltips
    this.ctxOverlay.canvas.addEventListener('mousemove', (e) => {
      const transformedDatapointFound = this.transformedDatapoints
        .find((t) => (this.calculateDistance(e.offsetX, e.offsetY, t.transformed.x, t.transformed.y) < this.config.chart.dataCircleOptions.radius * 2));
      if (transformedDatapointFound) {      
        this.ctxOverlay.clearRect(0, 0, this.ctxOverlay.canvas.width, this.ctxOverlay.canvas.height);
        // Highlight helper
        // Draw Helperlines (yaxis)
        if (this.config.axisY.helperOptions.showHelperLines) {
          const startCoordinateHelperY: CanvasCoordinate = {
            x: this.graphOrigin.x - this.config.graph.margin,
            y: transformedDatapointFound.transformed.y
          };
          const endCoordinateHelperY: CanvasCoordinate = {
            x: transformedDatapointFound.transformed.x,
            y: transformedDatapointFound.transformed.y
          };
          const helperOptionsY: LineOptions = {
            thickness: this.config.axisY.helperOptions.helperLineOptions.thickness,
            strokeColor: "black",
            type: "dashed"
          };
          this.drawLine(this.ctxOverlay, startCoordinateHelperY, endCoordinateHelperY, helperOptionsY);
        }
        // Draw Helperlines (xAxis)
        if (this.config.axisX.helperOptions.showHelperLines) {
          const startCoordinateHelperX: CanvasCoordinate = {
            x: transformedDatapointFound.transformed.x,
            y: this.graphOrigin.y + this.config.graph.margin
          };
          const endCoordinateHelperX: CanvasCoordinate = {
            x: transformedDatapointFound.transformed.x,
            y: transformedDatapointFound.transformed.y
          };
          const helperOptionsX: LineOptions = {
            thickness: this.config.axisX.helperOptions.helperLineOptions.thickness,
            strokeColor: "black",
            type: "dashed"
          };
          this.drawLine(this.ctxOverlay, startCoordinateHelperX, endCoordinateHelperX, helperOptionsX);
        }
        // Circle tooltip
        const circleCoordinate: CanvasCoordinate = { x: transformedDatapointFound.transformed.x, y: transformedDatapointFound.transformed.y };
        const circleOptions: CircleOptions = {
          radius: this.config.chart.dataCircleOptions.radius * 1.5,
          fillColor: this.config.chart.dataCircleOptions.fillColor,
          lineThickness: this.config.chart.dataCircleOptions.lineThickness * 1.5
        };
        this.drawCircle(this.ctxOverlay, circleCoordinate, circleOptions);

        // Rectangle tooltip
        const tooltipText = [
          `${transformedDatapointFound.display.y}${this.config.axisY.suffix ? ' '+this.config.axisY.suffix : ''}`,
          transformedDatapointFound.display.x
        ];
        const tooltipCoordinate: CanvasCoordinate = {
          x: transformedDatapointFound.transformed.x,
          y: transformedDatapointFound.transformed.y + this.config.chart.dataCircleOptions.radius + this.config.graph.tooltipOptions.marginFromPoint
        };
        const tooltipTextOptions = this.config.graph.tooltipOptions.textOptions;
        const tooltipRectOptions = this.config.graph.tooltipOptions.rectOptions;
        const tooltipPadding = this.config.graph.tooltipOptions.padding;
        const tooltipMarginFromPoint = this.config.graph.tooltipOptions.marginFromPoint;
        this.drawTooltip(this.ctxOverlay, tooltipCoordinate, tooltipText, { textOptions: tooltipTextOptions, rectOptions: tooltipRectOptions, padding: tooltipPadding, marginFromPoint: tooltipMarginFromPoint });
      } 
      else {
        this.ctxOverlay.clearRect(0, 0, this.ctxOverlay.canvas.width, this.ctxOverlay.canvas.height);
      }
    });
  }
}
