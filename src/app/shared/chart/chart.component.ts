import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from './chart-options.model';
import { ChartCoordinate, CircleOptions, LineOptions, RectOptions, TextOptions } from './chart.types';

/* eslint-disable no-unused-vars */

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasOverlay', { static: true }) canvasOverlay: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasContainer', { static: true }) canvasContainer: ElementRef<HTMLElement>;

  private ctx: CanvasRenderingContext2D;
  private ctxOverlay: CanvasRenderingContext2D;

  private options: ChartOptions;
  private transformedDataPoints: { transformed: ChartCoordinate, original: ChartCoordinate}[];

  constructor(private datePipe: DatePipe){}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctxOverlay = this.canvasOverlay.nativeElement.getContext('2d');
	this.transformedDataPoints = [];
  }

  initChart(options?: ChartOptions): void {
    this.options = options;

	

    this.initCanvas();
    this.initAxisX();
    this.initAxisY();
    this.initDatapoints();
  }

  private initCanvas(): void {
    // setting canvas width and height
    this.canvasContainer.nativeElement.style.width = this.options.canvas.width;
    this.canvasContainer.nativeElement.style.height = this.options.canvas.height;

    this.canvas.nativeElement.style.width = this.options.canvas.width;
    this.canvas.nativeElement.style.height = this.options.canvas.height;
    this.canvas.nativeElement.width = this.canvas.nativeElement.offsetWidth;
    this.canvas.nativeElement.height = this.canvas.nativeElement.offsetHeight;
    this.ctx.canvas.style.backgroundColor = this.options.canvas.backgroundColor;

    this.canvasOverlay.nativeElement.style.width = this.options.canvas.width;
    this.canvasOverlay.nativeElement.style.height = this.options.canvas.height;
    this.canvasOverlay.nativeElement.width = this.canvas.nativeElement.offsetWidth;
    this.canvasOverlay.nativeElement.height = this.canvas.nativeElement.offsetHeight;
  }
  private initAxisX(): void {
    // Draw line
    const startCoordinate: ChartCoordinate = {
      x: this.options.canvas.margin + (this.options.axisX.axisOptions.showAxisIntersect ? 0 : (this.options.axisY.title ? this.options.axisY.titleTextOptions.fontSize : 0)),
      y: this.canvas.nativeElement.height - this.options.canvas.margin - (this.options.axisX.title ? this.options.axisX.titleTextOptions.fontSize : 0) - (this.options.axisX.axisValues.showAxisValues ? this.options.axisX.axisValues.axisValuesTextOptions.fontSize + 5 : 0)
    };
    const endCoordinate: ChartCoordinate = {
      x: this.canvas.nativeElement.width - this.options.canvas.margin,
      y: this.canvas.nativeElement.height - this.options.canvas.margin - (this.options.axisX.title ? this.options.axisX.titleTextOptions.fontSize : 0) - (this.options.axisX.axisValues.showAxisValues ? this.options.axisX.axisValues.axisValuesTextOptions.fontSize + 5 : 0)
    };
    this.drawLine(this.ctx, startCoordinate, endCoordinate, this.options.axisX.axisOptions.axisLineOptions);
    // Draw line arrow
    if(this.options.axisX.axisOptions.arrowOptions.showArrow){
      this.ctx.save();
      this.ctx.moveTo(endCoordinate.x, endCoordinate.y);
      this.ctx.lineTo(endCoordinate.x - this.options.axisX.axisOptions.arrowOptions.arrowSize, endCoordinate.y - (this.options.axisX.axisOptions.arrowOptions.arrowSize/2));
      this.ctx.lineTo(endCoordinate.x - this.options.axisX.axisOptions.arrowOptions.arrowSize, endCoordinate.y + (this.options.axisX.axisOptions.arrowOptions.arrowSize/2));
      this.ctx.closePath();
      this.ctx.fillStyle = this.options.axisX.axisOptions.axisLineOptions.strokeColor;
      this.ctx.fill();
      this.ctx.restore();
    }
    // Draw title
    if(this.options.axisX.title){
      const xAxisTitleCoordinate: ChartCoordinate = { x: null, y: null };
      xAxisTitleCoordinate.y = this.canvas.nativeElement.height - this.options.canvas.margin - this.options.axisX.titleTextOptions.fontSize + 5;
      switch (this.options.axisX.titleTextOptions.alignment) {
        case 'left':
          xAxisTitleCoordinate.x = this.options.canvas.margin;
          break;
        case 'center':
          xAxisTitleCoordinate.x = this.canvas.nativeElement.width / 2;
          break;
        case 'right':
          xAxisTitleCoordinate.x = this.canvas.nativeElement.width - this.options.canvas.margin - this.options.axisX.axisOptions.arrowOptions.arrowSize - 5;
          break;
      }
      const text = `${this.options.axisX.title}${this.options.axisX.suffix ? ' ('+this.options.axisX.suffix+')':''}`; 
      this.drawText(this.ctx, xAxisTitleCoordinate, text, this.options.axisX.titleTextOptions);
    }
  }
  private initAxisY(): void {
    // Draw line
    const startCoordinate: ChartCoordinate = {
      x: this.options.canvas.margin + (this.options.axisY.title ? this.options.axisY.titleTextOptions.fontSize : 0),
      y: this.options.canvas.margin
    };
    const endCoordinate: ChartCoordinate = {
      x: this.options.canvas.margin + (this.options.axisY.title ? this.options.axisY.titleTextOptions.fontSize : 0),
      y: this.canvas.nativeElement.height - this.options.canvas.margin - (this.options.axisY.axisOptions.showAxisIntersect ? 0 : (this.options.axisY.title ? this.options.axisY.titleTextOptions.fontSize : 0))
    };
    this.drawLine(this.ctx, startCoordinate, endCoordinate, this.options.axisY.axisOptions.axisLineOptions);
    // Draw line arrow
    if(this.options.axisY.axisOptions.arrowOptions.showArrow){
      this.ctx.save();
      this.ctx.moveTo(startCoordinate.x, startCoordinate.y);
      this.ctx.lineTo(startCoordinate.x - (this.options.axisY.axisOptions.arrowOptions.arrowSize/2), startCoordinate.y + this.options.axisY.axisOptions.arrowOptions.arrowSize);
      this.ctx.lineTo(startCoordinate.x + (this.options.axisY.axisOptions.arrowOptions.arrowSize/2), startCoordinate.y + this.options.axisY.axisOptions.arrowOptions.arrowSize);
      this.ctx.closePath();
      this.ctx.fillStyle = this.options.axisY.axisOptions.axisLineOptions.strokeColor;
      this.ctx.fill();
      this.ctx.restore();
    }
    // Draw title
    if(this.options.axisY.title){
      const yAxisTitleCoordinate: ChartCoordinate = { x: null, y: null };
      yAxisTitleCoordinate.x = this.options.canvas.margin + this.options.axisY.titleTextOptions.fontSize - 5;
      switch (this.options.axisY.titleTextOptions.alignment) {
        case 'left':
          yAxisTitleCoordinate.y = this.canvas.nativeElement.height - this.options.canvas.margin;
          break;
        case 'center':
          yAxisTitleCoordinate.y = this.canvas.nativeElement.height / 2;
          break;
        case 'right':
          yAxisTitleCoordinate.y = this.options.canvas.margin + this.options.axisY.axisOptions.arrowOptions.arrowSize + 5;
          break;
      }
      const text = `${this.options.axisY.title}${this.options.axisY.suffix ? ' ('+this.options.axisY.suffix+')':''}`;
      this.drawText(this.ctx, yAxisTitleCoordinate, text, this.options.axisY.titleTextOptions);
    }
  }
  private initDatapoints(): void{
    // Graph metric data (origin coordinate, width, height)
    // GraphOrigin = 0,0 with margins
    const graphOrigin: ChartCoordinate = {
      x: this.options.canvas.margin + (this.options.axisY.title ? this.options.axisY.titleTextOptions.fontSize : 0) + this.options.graph.margin,
      y: this.canvas.nativeElement.height - this.options.canvas.margin - (this.options.axisX.title ? this.options.axisX.titleTextOptions.fontSize : 0) - this.options.graph.margin  - (this.options.axisX.axisValues.showAxisValues ? this.options.axisX.axisValues.axisValuesTextOptions.fontSize + 5 : 0)
    };
    const graphWidth = this.canvas.nativeElement.width - ((this.options.canvas.margin + this.options.graph.margin)*2) - (this.options.axisY.title ? this.options.axisY.titleTextOptions.fontSize + 5 : 0);
    const graphHeight = this.canvas.nativeElement.height - ((this.options.canvas.margin + this.options.graph.margin)*2) - (this.options.axisX.title ? this.options.axisX.titleTextOptions.fontSize + 5: 0) - (this.options.axisX.axisValues.showAxisValues ? this.options.axisX.axisValues.axisValuesTextOptions.fontSize + 5 : 0);

    // calculate data ranges
    const xRangeMin = Math.min(...this.options.dataPoints.map((d) => d.x));
    const xRangeMax = Math.max(...this.options.dataPoints.map((d) => d.x));
    const xRangeDiff = (xRangeMax - xRangeMin);
    const xRatio = graphWidth / xRangeDiff;
    const yRangeMin = Math.min(...this.options.dataPoints.map((d) => d.y));
    const yRangeMax = Math.max(...this.options.dataPoints.map((d) => d.y));
    const yRangeDiff = yRangeMax - yRangeMin;
    const yRatio = graphHeight / yRangeDiff;
    
    this.options.dataPoints.sort((a, b) => a.x - b.x);

    // Datapoints and connections
    const transformedDatapoints: { transformed: ChartCoordinate, original: ChartCoordinate }[] = [];
    for (let i = 0; i < this.options.dataPoints.length; i++) {
      const transformedX = graphOrigin.x + Math.floor((this.options.dataPoints[i].x - xRangeMin) * xRatio);
      const transformedY = Math.floor(graphOrigin.y + - ((this.options.dataPoints[i].y - yRangeMin) * yRatio));
      const coordinate: ChartCoordinate = { x: transformedX, y: transformedY };
      transformedDatapoints.push(
        {
          transformed: coordinate,
          original: this.options.dataPoints[i]
        });
    }
    if(this.options.graph.averageOptions.showAverage){
      const startCoordinateAvg: ChartCoordinate = {
        x: transformedDatapoints[0].transformed.x,
        y: transformedDatapoints[0].transformed.y
      };
      const endCoordinateAvg: ChartCoordinate = {
        x: transformedDatapoints[transformedDatapoints.length-1].transformed.x,
        y: transformedDatapoints[transformedDatapoints.length-1].transformed.y
      };
      this.drawLine(this.ctx, startCoordinateAvg, endCoordinateAvg, this.options.graph.averageOptions.averageLineOptions);
    }
    for(let i = 0; i < transformedDatapoints.length; i++){
    //   const circleOptions: CircleOptions = {
    //     radius: this.options.graph.dataCircleOptions.radius,
    //     strokeColor: this.options.graph.data,
    //     fillColor: this.options.graph.pointFillColor,
    //     lineThickness: this.options.graph.lineThickness
    //   };
      // Draw Helperlines (yaxis)
      if (this.options.axisY.helperOptions.showHelperLines) {
        const startCoordinateHelperY: ChartCoordinate = {
          x: graphOrigin.x - this.options.graph.margin,
          y: transformedDatapoints[i].transformed.y
        };
        const endCoordinateHelperY: ChartCoordinate = {
          x: transformedDatapoints[i].transformed.x,
          y: transformedDatapoints[i].transformed.y
        };
        this.drawLine(this.ctx, startCoordinateHelperY, endCoordinateHelperY, this.options.axisY.helperOptions.helperLineOptions);
      }
      // Draw Helperlines (xAxis)
      if (this.options.axisX.helperOptions.showHelperLines) {
        const startCoordinateHelperX: ChartCoordinate = {
          x: transformedDatapoints[i].transformed.x,
          y: graphOrigin.y + this.options.graph.margin
        };
        const endCoordinateHelperX: ChartCoordinate = {
          x: transformedDatapoints[i].transformed.x,
          y: transformedDatapoints[i].transformed.y
        };
        this.drawLine(this.ctx, startCoordinateHelperX, endCoordinateHelperX, this.options.axisX.helperOptions.helperLineOptions);
      }
      // Draw axisValues (xAxis)
      if(this.options.axisX.axisValues.showAxisValues){
      const axisValueCoordinate: ChartCoordinate = {
        x: transformedDatapoints[i].transformed.x,
        y: graphOrigin.y + this.options.graph.margin + 5
      };
      const axisValue = this.datePipe.transform(new Date(transformedDatapoints[i].original.x), 'dd/MM/yyyy');
      const axisValueSize = this.ctx.measureText(axisValue).width;
      if((transformedDatapoints[i].transformed.x - graphOrigin.x < axisValueSize / 2) && (graphWidth - transformedDatapoints[i].transformed.x > axisValueSize / 2)){
        this.options.axisX.axisValues.axisValuesTextOptions.alignment = "left";
      } else if((transformedDatapoints[i].transformed.x - graphOrigin.x > axisValueSize / 2) && (graphWidth - transformedDatapoints[i].transformed.x < axisValueSize / 2)){
        this.options.axisX.axisValues.axisValuesTextOptions.alignment = "right";
      } else {
        this.options.axisX.axisValues.axisValuesTextOptions.alignment = "center";
      }
      this.drawText(this.ctx, axisValueCoordinate, axisValue, this.options.axisX.axisValues.axisValuesTextOptions);
      }
      // Draw Connection
      if (i < this.options.dataPoints.length - 1) {
        const nextTransformedX = graphOrigin.x + Math.floor((this.options.dataPoints[i+1].x - xRangeMin) * xRatio);
        const nextTransformedY = Math.floor(graphOrigin.y + - ((this.options.dataPoints[i+1].y - yRangeMin) * yRatio));
        const startCoordinate: ChartCoordinate = { x: transformedDatapoints[i].transformed.x, y: transformedDatapoints[i].transformed.y };
        const endCoordinate: ChartCoordinate = { x: nextTransformedX, y: nextTransformedY };
        this.drawLine(this.ctx, startCoordinate, endCoordinate, this.options.graph.dataLineOptions);
      }
      // Draw point
      this.drawCircle(this.ctx, { x: transformedDatapoints[i].transformed.x, y: transformedDatapoints[i].transformed.y }, this.options.graph.dataCircleOptions);
    }
    // Draw tooltips
    this.ctxOverlay.canvas.addEventListener('mousemove', (e) => {
      const transformedDatapointFound = transformedDatapoints
        .find((t) => (this.calculateDistance(e.offsetX, e.offsetY, t.transformed.x, t.transformed.y) < this.options.graph.dataCircleOptions.radius * 2));
      if (transformedDatapointFound) {      
        this.ctxOverlay.clearRect(0, 0, this.ctxOverlay.canvas.width, this.ctxOverlay.canvas.height);
        // Highlight helper
        // Draw Helperlines (yaxis)
        if (this.options.axisY.helperOptions.showHelperLines) {
          const startCoordinateHelperY: ChartCoordinate = {
            x: graphOrigin.x - this.options.graph.margin,
            y: transformedDatapointFound.transformed.y
          };
          const endCoordinateHelperY: ChartCoordinate = {
            x: transformedDatapointFound.transformed.x,
            y: transformedDatapointFound.transformed.y
          };
          const helperOptionsY: LineOptions = {
            thickness: this.options.axisY.helperOptions.helperLineOptions.thickness,
            strokeColor: "black",
            type: "dashed"
          };
          this.drawLine(this.ctxOverlay, startCoordinateHelperY, endCoordinateHelperY, helperOptionsY);
        }
        // Draw Helperlines (xAxis)
        if (this.options.axisX.helperOptions.showHelperLines) {
          const startCoordinateHelperX: ChartCoordinate = {
            x: transformedDatapointFound.transformed.x,
            y: graphOrigin.y + this.options.graph.margin
          };
          const endCoordinateHelperX: ChartCoordinate = {
            x: transformedDatapointFound.transformed.x,
            y: transformedDatapointFound.transformed.y
          };
          const helperOptionsX: LineOptions = {
            thickness: this.options.axisX.helperOptions.helperLineOptions.thickness,
            strokeColor: "black",
            type: "dashed"
          };
          this.drawLine(this.ctxOverlay, startCoordinateHelperX, endCoordinateHelperX, helperOptionsX);
        }
        // Circle tooltip
        const circleCoordinate: ChartCoordinate = { x: transformedDatapointFound.transformed.x, y: transformedDatapointFound.transformed.y };
        const circleOptions: CircleOptions = {
          radius: this.options.graph.dataCircleOptions.radius * 1.5,
          fillColor: this.options.graph.dataCircleOptions.fillColor,
          lineThickness: this.options.graph.dataCircleOptions.lineThickness * 1.5
        };
        this.drawCircle(this.ctxOverlay, circleCoordinate, circleOptions);

        // Rectangle tooltip
        const tooltipText = [
			`${transformedDatapointFound.original.y.toString()}${this.options.axisY.suffix ? ' '+this.options.axisY.suffix : ''}`,
			this.datePipe.transform(new Date(transformedDatapointFound.original.x), 'dd/MM/yyyy')
		];
        const tooltipCoordinate: ChartCoordinate = {
          x: transformedDatapointFound.transformed.x,
          y: transformedDatapointFound.transformed.y + 20
        };
		const tooltipTextOptions = this.options.graph.tooltipOptions.textOptions;
		const tooltipRectOptions = this.options.graph.tooltipOptions.rectOptions;
        this.drawTooltip(this.ctxOverlay, tooltipCoordinate, tooltipText, tooltipTextOptions, tooltipRectOptions);
      } 
      else {
        this.ctxOverlay.clearRect(0, 0, this.ctxOverlay.canvas.width, this.ctxOverlay.canvas.height);
      }
    });
  }
  /*
    HELPER METHODS
  */
  private calculateDistance(xA: number, yA: number, xB: number, yB: number): number {
    const xDiff: number = xA - xB;
    const yDiff: number = yA - yB;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  }
  private drawTooltip(ctx: CanvasRenderingContext2D, pos: ChartCoordinate, textLines: string[], textOptions?: TextOptions, rectOptions?: RectOptions): void {
    ctx.save();
    ctx.fillStyle = rectOptions.fillColor;
    ctx.strokeStyle = rectOptions.strokeColor;
    ctx.font = `${textOptions.fontSize}px ${textOptions.font}`;
    // Draw rectangle
    // 1. calculate total width / height
    if (textLines.length > 0) {
      let longestSize = 0;
      for(const line of textLines){
        const lineSize = ctx.measureText(line).width;
        if(lineSize > longestSize){
          longestSize = lineSize;
        }
      }
      rectOptions.width = longestSize + 20;
      rectOptions.height = (this.options.graph.tooltipOptions.textOptions.fontSize * textLines.length) + (textLines.length > 1 ? 5 * (textLines.length -1) : 0) + 20;

      // Moving canvas cursor to corner for rectangle to start
      if(pos.x - (rectOptions.width/2) > 0){
        if(ctx.canvas.width - pos.x > rectOptions.width/2){
          ctx.translate(-rectOptions.width/2, 0);
        } else {
          ctx.translate(rectOptions.width*-1, 0);
        }
      }
      if(ctx.canvas.height - pos.y < rectOptions.height){
        ctx.translate(0, (rectOptions.height * -1.5 - 10) );
      }
      // Draw rectangle
      this.drawRect(ctx, pos, rectOptions);
      // Move cursor for text
      ctx.translate(rectOptions.width/2, 10);
      // Draw text
      for(let i = 0; i < textLines.length; i++){
        this.drawText(ctx, pos, textLines[i], textOptions);
        if(i < textLines.length -1){
          ctx.translate(0,textOptions.fontSize + 5);
        } 
      }
    }

    ctx.restore();
  }
  private drawLine(ctx: CanvasRenderingContext2D, start: ChartCoordinate, end: ChartCoordinate, options?: LineOptions): void {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = options.thickness;
    if(options.type === "dashed"){
      ctx.setLineDash([10,10]);
    }
    ctx.strokeStyle = options.strokeColor;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.restore();
  }
  private drawText(ctx: CanvasRenderingContext2D, pos: ChartCoordinate, text: string, options?: TextOptions): void {
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.font = `${options.fontWeight || 'bold'} ${options.fontSize}px ${options.font}`;
    ctx.fillStyle = options.color;

    if (options.alignment) {
      ctx.textAlign = options.alignment;
    }
    if (options.direction === 'horizontal') {
      ctx.textBaseline = 'top';
    } else {
      ctx.textBaseline = 'bottom';
      ctx.rotate(-Math.PI / 2);
    }

    ctx.fillText(text, 0, 0);
    ctx.restore();
  }
  private drawCircle(ctx: CanvasRenderingContext2D, pos: ChartCoordinate, options?: CircleOptions): void {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = options.strokeColor;
    ctx.fillStyle = options.fillColor;
    ctx.lineWidth = options.lineThickness;
    ctx.arc(pos.x, pos.y, options.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
  private drawRect(ctx: CanvasRenderingContext2D, pos: ChartCoordinate, options?: RectOptions): void {
    ctx.fillStyle = options.fillColor;
    ctx.strokeStyle = options.strokeColor;
    if(options.shadowColor && options.shadowBlur){
      ctx.shadowColor = options.shadowColor;
      ctx.shadowBlur = options.shadowBlur;
    }

    const width = options.width;
    const height = options.height;

    ctx.save();
    if(options.cornerRadius){
      if (width < 2 * options.cornerRadius) options.cornerRadius = width / 2;
      if (height < 2 * options.cornerRadius) options.cornerRadius = height / 2;
      ctx.beginPath();
      ctx.moveTo(pos.x + options.cornerRadius, pos.y);
      ctx.arcTo(pos.x + width, pos.y, pos.x + width, pos.y + height, options.cornerRadius);
      ctx.arcTo(pos.x + width, pos.y + height, pos.x, pos.y + height, options.cornerRadius);
      ctx.arcTo(pos.x, pos.y + height, pos.x, pos.y, options.cornerRadius);
      ctx.arcTo(pos.x, pos.y, pos.x + width, pos.y, options.cornerRadius);
      ctx.closePath();
    } else {
      ctx.rect(pos.x, pos.y, width, height);
    }
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
