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

  ngOnInit(): void {
      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.ctxOverlay = this.canvasOverlay.nativeElement.getContext('2d');
  }

  initChart(options?: ChartOptions) {
      this.options = options;

      this.initCanvas();
      this.initAxis();
      this.initDatapoints();
  }

  private initCanvas() {
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
      // this.ctxOverlay.canvas.style.backgroundColor = "#00ff0050";
  }

  private initAxis() {
      this.initAxisX();
      this.initAxisY();
  }

  private initDatapoints() {
      // Inner box within axis X and Y to draw graph extras
      const graphOrigin: ChartCoordinate = {
          x: this.options.canvas.margin,
          y: this.options.canvas.margin
      };
      // Inner box within axis X and Y (incl. margin) to draw graph
      const graphOriginMargin: ChartCoordinate = {
          x: this.options.canvas.margin * 1.5,
          y: this.options.canvas.margin * 1.5
      };

      // Calculate graph domains
      const graphWidth = this.ctx.canvas.width - (this.options.canvas.margin * 2);
      const graphHeight = this.ctx.canvas.height - (this.options.canvas.margin * 2);
      const graphWidthMargin = this.ctx.canvas.width - (this.options.canvas.margin * 3);
      const graphHeightMargin = this.ctx.canvas.height - (this.options.canvas.margin * 3);

      // calculate data ranges
      const xRangeMin = Math.min(...this.options.dataPoints.map((d) => d.x));
      const xRangeMax = Math.max(...this.options.dataPoints.map((d) => d.x));
      const xRangeDiff = (xRangeMax - xRangeMin);
      const xRatio = graphWidthMargin / xRangeDiff;
      const yRangeMin = Math.min(...this.options.dataPoints.map((d) => d.y));
      const yRangeMax = Math.max(...this.options.dataPoints.map((d) => d.y));
      const yRangeDiff = yRangeMax - yRangeMin;
      const yRatio = graphHeightMargin / yRangeDiff;

      this.options.dataPoints.sort((a, b) => a.x - b.x);
      this.ctx.translate(graphOriginMargin.x, graphOriginMargin.y);

      // Draw Average
      if (this.options.dataPoints.length > 1 && this.options.graph.showAverage === true) {
          //const average = this.options.dataPoints.map(d => d.y).reduce((prev, curr, _, array) => prev + (curr/array.length), 0);
          let total: number = 0;
          for(let datapoint of this.options.dataPoints){
              total += Math.floor(datapoint.y)
          }
          const average = total / this.options.dataPoints.length
          const startTransformedX = 0;
          const startTransformedY = graphHeightMargin - ((average - yRangeMin) * yRatio);
          const endTransformedX = graphWidthMargin;
          const endTransformedY = graphHeightMargin - ((average - yRangeMin) * yRatio);

          const startCoordinate: ChartCoordinate = { x: startTransformedX, y: startTransformedY };
          const endCoordinate: ChartCoordinate = { x: endTransformedX, y: endTransformedY };
          const lineOptions: LineOptions = {
              thickness: this.options.graph.averageThickness,
              strokeColor: this.options.graph.averageColor
          };
          this.drawLine(this.ctx, startCoordinate, endCoordinate, lineOptions);
          const textOptions: TextOptions = {
            color: "red",
            alignment: "right",
            direction: "horizontal",
            fontSize: this.options.graph.fontSize,
            font: this.options.graph.font,
          };
          const text = `${average.toFixed(2)} ${this.options.axisY.suffix}`
          this.drawText(this.ctx, endCoordinate, text, textOptions);
      }

      // Datapoints and connections
      const transformedDatapoints: { transformed: ChartCoordinate, original: ChartCoordinate }[] = [];
      for (let i = 0; i < this.options.dataPoints.length; i++) {
      // Draw point
          const transformedX = Math.floor((this.options.dataPoints[i].x - xRangeMin) * xRatio);
          const transformedY = Math.floor(graphHeightMargin - ((this.options.dataPoints[i].y - yRangeMin) * yRatio));
          const coordinate: ChartCoordinate = { x: transformedX, y: transformedY };
          transformedDatapoints.push(
              {
                  transformed: {
                      x: Math.floor(coordinate.x + (this.options.canvas.margin * 1.5)),
                      y: Math.floor(coordinate.y + (this.options.canvas.margin * 1.5))
                  },
                  original: {
                      x: coordinate.x,
                      y: coordinate.y
                  }
              });
          const circleOptions: CircleOptions = {
              radius: this.options.graph.pointRadius,
              strokeColor: this.options.graph.pointStrokeColor,
              fillColor: this.options.graph.pointFillColor,
              lineThickness: this.options.graph.lineThickness
          };
          this.drawCircle(this.ctx, coordinate, circleOptions);

          // Draw Connection
          if (i < this.options.dataPoints.length - 1) {
              const nextTransformedX = (this.options.dataPoints[i + 1].x - xRangeMin) * xRatio;
              const nextTransformedY = graphHeightMargin - ((this.options.dataPoints[i + 1].y - yRangeMin) * yRatio);
              const startCoordinate: ChartCoordinate = { x: transformedX, y: transformedY };
              const endCoordinate: ChartCoordinate = { x: nextTransformedX, y: nextTransformedY };
              const options: LineOptions = {
                  thickness: this.options.graph.lineThickness,
                  strokeColor: this.options.graph.lineColor
              };
              this.drawLine(this.ctx, startCoordinate, endCoordinate, options);
          }
          // Draw Text
          const textAlign: 'left' | 'center' | 'right' = i === 0 ? 'left' : i === this.options.dataPoints.length - 1 ? 'right' : 'center';
          const pointTextCoordinate: ChartCoordinate = { x: transformedX, y: transformedY - (this.options.graph.fontSize + this.options.graph.pointRadius + 10) };
          const pointText = `${this.options.dataPoints[i].y.toFixed(2) as unknown as number} ${this.options.axisY.suffix}`;
          const pointTextOptions: TextOptions = {
              direction: 'horizontal',
              alignment: textAlign,
              font: this.options.graph.font,
              fontSize: this.options.graph.fontSize,
              color: this.options.graph.fontColor
          };
          this.drawText(this.ctx, pointTextCoordinate, pointText, pointTextOptions);

          // Draw Helperlines
          if (this.options.graph.showHelperLines) {
              this.ctx.save();
              this.ctx.translate(-this.options.canvas.margin / 2, -this.options.canvas.margin);
              const startCoordinate: ChartCoordinate = {
                  x: 0,
                  y: transformedY + this.options.canvas.margin
              };
              const endCoordinate: ChartCoordinate = {
                  x: graphWidth,
                  y: transformedY + this.options.canvas.margin
              };
              const options: LineOptions = {
                  thickness: this.options.graph.helperLinesThickness,
                  strokeColor: this.options.graph.lineColor + '40'
              };
              this.drawLine(this.ctx, startCoordinate, endCoordinate, options);
              this.ctx.restore();
          }
      }

      // Draw tooltips
      this.ctxOverlay.canvas.addEventListener('mousemove', (e) => {
          const transformedDatapointFound = transformedDatapoints
              .map((dp) => dp.transformed)
              .find((t) => (this.getDistance(e.offsetX, e.offsetY, t.x, t.y) < this.options.graph.pointRadius * 2));
          if (transformedDatapointFound) {
              this.ctxOverlay.save();
              this.ctxOverlay.translate(transformedDatapointFound.x, transformedDatapointFound.y);
              // Tooltip circle
              const circleCoordinate: ChartCoordinate = {
                  x: 0,
                  y: 0
              };
              const circleOptions: CircleOptions = {
                  radius: this.options.graph.pointRadius * 1.5,
                  fillColor: this.options.graph.pointFillColor
              };
              this.drawCircle(this.ctxOverlay, circleCoordinate, circleOptions);
              // Tooltip text
              const tooltipTextOptions: TextOptions = {
                  direction: 'horizontal',
                  font: 'Verdana',
                  fontSize: 16,
                  alignment: 'center'
              };
              const tooltipRectOptions: RectOptions = {
                  fillColor: this.options.graph.tooltipBackground + '50',
                  width: 75,
                  height: 35,
                  alignment: 'center',
                  fontSize: this.options.graph.tooltipFontSize,
                  font: this.options.graph.font,
                  text: 'Dit is een test sssssssssssssssssssssssssssssssssssssss'
              };
              const tooltipCoordinate: ChartCoordinate = {
                  x: 0,
                  y: -70
              };

              this.drawRect(this.ctxOverlay, tooltipCoordinate, tooltipRectOptions);
          } else {
              this.ctxOverlay.clearRect(0, 0, this.ctxOverlay.canvas.width, this.ctxOverlay.canvas.height);
          }

          this.ctxOverlay.restore();
      });
  }
  getDistance(xA: number, yA: number, xB: number, yB: number) {
      const xDiff: number = xA - xB;
      const yDiff: number = yA - yB;

      return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  }

  private initAxisY() {
      // Draw Line
      const startCoordinate: ChartCoordinate = {
          x: this.options.canvas.margin,
          y: this.options.canvas.margin - this.options.axisY.axisBlockLineSize
      };
      const endCoordinate: ChartCoordinate = {
          x: this.options.canvas.margin,
          y: this.ctx.canvas.height - this.options.canvas.margin + this.options.axisY.axisBlockLineSize
      };
      const lineOptions: LineOptions = {
          thickness: this.options.axisY.thickness,
          strokeColor: this.options.axisY.color
      };
      this.drawLine(this.ctx, startCoordinate, endCoordinate, lineOptions);

      // Draw Title
      const yAxisTitleCoordinate: ChartCoordinate = { x: null, y: null };
      yAxisTitleCoordinate.x = this.options.canvas.margin - (this.options.axisY.titleFontSize / 4);
      switch (this.options.axisY.titleAlignment) {
      case 'right':
          yAxisTitleCoordinate.y = this.options.canvas.margin;
          break;
      case 'center':
          yAxisTitleCoordinate.y = this.canvas.nativeElement.height / 2;
          break;
      case 'left':
          yAxisTitleCoordinate.y = this.canvas.nativeElement.height - this.options.canvas.margin;
          break;
      }
      const text = `${this.options.axisY.title} (${this.options.axisY.suffix})`;
      const textOptions: TextOptions = {
          direction: 'vertical',
          alignment: this.options.axisY.titleAlignment,
          font: this.options.axisY.titleFont,
          fontSize: this.options.axisY.titleFontSize,
          color: this.options.axisY.color
      };
      this.drawText(this.ctx, yAxisTitleCoordinate, text, textOptions);
  }

  private initAxisX() {
      // Draw Line
      const startCoordinate: ChartCoordinate = {
          x: this.options.canvas.margin - this.options.axisX.axisBlockLineSize,
          y: this.canvas.nativeElement.height - this.options.canvas.margin
      };
      const endCoordinate: ChartCoordinate = {
          x: this.canvas.nativeElement.width - this.options.canvas.margin + this.options.axisX.axisBlockLineSize,
          y: this.canvas.nativeElement.height - this.options.canvas.margin
      };
      const options: LineOptions = {
          thickness: this.options.axisX.thickness,
          strokeColor: this.options.axisX.color
      };
      this.drawLine(this.ctx, startCoordinate, endCoordinate, options);

      // Draw Title
      const xAxisTitleCoordinate: ChartCoordinate = { x: null, y: null };
      xAxisTitleCoordinate.y = this.canvas.nativeElement.height - (this.options.canvas.margin - this.options.axisX.titleFontSize / 4);
      switch (this.options.axisX.titleAlignment) {
      case 'left':
          xAxisTitleCoordinate.x = this.options.canvas.margin;
          break;
      case 'center':
          xAxisTitleCoordinate.x = this.canvas.nativeElement.width / 2;
          break;
      case 'right':
          xAxisTitleCoordinate.x = this.canvas.nativeElement.width - this.options.canvas.margin;
          break;
      }
      const text = `${this.options.axisX.title} (${this.options.axisX.suffix})`;
      const textOptions: TextOptions = {
          direction: 'horizontal',
          alignment: this.options.axisX.titleAlignment,
          font: this.options.axisX.titleFont,
          fontSize: this.options.axisX.titleFontSize,
          color: this.options.axisX.color
      };
      this.drawText(this.ctx, xAxisTitleCoordinate, text, textOptions);
  }

  private drawRect(ctx: CanvasRenderingContext2D, coordinate: ChartCoordinate, options?: RectOptions) {
      ctx.fillStyle = options.fillColor;
      ctx.font = `${options.fontSize}px ${options.font}`;
      ctx.strokeStyle = options.strokeColor;

      let width = options.width;
      let height = options.height;
      if (options.text) {
          width = ctx.measureText(options.text).width + 20;
          height = this.options.graph.tooltipFontSize + 20;
      }

      ctx.save();
      switch (options.alignment) {
      case 'center':
          ctx.translate(-width / 2, coordinate.y);
          break;
      case 'right':
          ctx.translate(-width, coordinate.y);
          break;
      default:
          ctx.translate(0, coordinate.y);
          break;
      }

      // this.drawCircle(this.ctxOverlay, {x: 0, y: 0}, {radius: 10, fillColor: "orange"})
      ctx.fillRect(0, 0, width, height);
      ctx.strokeRect(0, 0, width, height);
      if (options.text) {
          ctx.translate(width / 2, 10);
          // this.drawCircle(this.ctxOverlay, {x: 0, y: 0}, {radius: 10, fillColor: "red"})
          this.drawText(this.ctxOverlay, { x: 0, y: 0 }, options.text, { fontSize: this.options.graph.tooltipFontSize, color: this.options.graph.tooltipFontColor, direction: 'horizontal', alignment: 'center' });
      }
      ctx.restore();
  }

  private drawLine(ctx: CanvasRenderingContext2D, start: ChartCoordinate, end: ChartCoordinate, options?: LineOptions) {
      ctx.lineWidth = options.thickness;
      ctx.beginPath();
      ctx.strokeStyle = options.strokeColor;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
  }
  private drawText(ctx: CanvasRenderingContext2D, pos: ChartCoordinate, text: string, options?: TextOptions) {
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.font = `${options.fontSize}px ${options.font}`;
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
  private drawCircle(ctx: CanvasRenderingContext2D, pos: ChartCoordinate, options?: CircleOptions) {
      ctx.beginPath();
      ctx.strokeStyle = options.strokeColor;
      ctx.fillStyle = options.fillColor;
      ctx.lineWidth = options.lineThickness;
      ctx.arc(pos.x, pos.y, options.radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
  }
}
