import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartCoordinate, ChartOptions } from './chart-options.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  

  private ctx: CanvasRenderingContext2D;

  private options: ChartOptions;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  initChart(options?: ChartOptions){
    this.options = options;
    // init options
    this.canvas.nativeElement.width = this.canvas.nativeElement.offsetWidth
    this.canvas.nativeElement.height = this.canvas.nativeElement.offsetHeight
    this.ctx.canvas.style.backgroundColor = this.options.canvas.backgroundColor;

    this.initAxis();
    
    this.initDatapoints();
  }

  private initAxis(){
    // X-axis
    this.drawLine({ x: (this.options.canvas.margin - this.options.axisX.axisBlockLineSize), y: (this.canvas.nativeElement.height - this.options.canvas.margin) }, { x: (this.canvas.nativeElement.width - this.options.canvas.margin + this.options.axisX.axisBlockLineSize), y: (this.canvas.nativeElement.height - this.options.canvas.margin) }, { thickness: this.options.axisX.thickness, strokeColor: this.options.axisX.color })
    let xAxisTitleCoordinate: ChartCoordinate = new ChartCoordinate();
    xAxisTitleCoordinate.y = this.canvas.nativeElement.height - (this.options.canvas.margin - this.options.axisX.titleFontSize/4);
    switch(this.options.axisX.titleAlignment){
      case "left":
        xAxisTitleCoordinate.x = this.options.canvas.margin
        break;
      case "center":
        xAxisTitleCoordinate.x = this.canvas.nativeElement.width/2;
        break;
      case "right":
        xAxisTitleCoordinate.x = this.canvas.nativeElement.width - this.options.canvas.margin;
        break;
    }
    this.drawText(xAxisTitleCoordinate, `${this.options.axisX.title} (${this.options.axisX.suffix})`, { direction: 'horizontal', alignment: this.options.axisX.titleAlignment, font: this.options.axisX.titleFont, fontSize: this.options.axisX.titleFontSize, color: this.options.axisX.color });

    // Draw Y-axis
    this.drawLine({ x: this.options.canvas.margin, y: (this.options.canvas.margin - this.options.axisY.axisBlockLineSize) }, { x: this.options.canvas.margin, y: (this.ctx.canvas.height - this.options.canvas.margin + this.options.axisY.axisBlockLineSize) }, { thickness: this.options.axisY.thickness, strokeColor: this.options.axisY.color })
    let yAxisTitleCoordinate: ChartCoordinate = new ChartCoordinate();
    yAxisTitleCoordinate.x = this.options.canvas.margin - (this.options.axisY.titleFontSize/4);
    switch(this.options.axisY.titleAlignment){
      case "right":
        yAxisTitleCoordinate.y= this.options.canvas.margin
        break;
      case "center":
        yAxisTitleCoordinate.y = this.canvas.nativeElement.height/2;
        break;
      case "left":
        yAxisTitleCoordinate.y = this.canvas.nativeElement.height - this.options.canvas.margin;
        break;
    }
    this.drawText(yAxisTitleCoordinate, `${this.options.axisY.title} (${this.options.axisY.suffix})`, { direction: 'vertical', alignment: this.options.axisY.titleAlignment, font: this.options.axisY.titleFont, fontSize: this.options.axisY.titleFontSize, color: this.options.axisY.color });
    
  }

  private initDatapoints(){
    let gridOrigin: ChartCoordinate = { x: this.options.canvas.margin * 1.5, y: this.options.canvas.margin *1.5 }
    this.ctx.translate(gridOrigin.x, gridOrigin.y)

    let gridWidth = this.ctx.canvas.width - (this.options.canvas.margin * 1.5);
    let gridHeight = this.ctx.canvas.height - (this.options.canvas.margin * 1.5);

    let gridWidthMargin = this.ctx.canvas.width - (this.options.canvas.margin * 3);
    let gridHeightMargin = this.ctx.canvas.height - (this.options.canvas.margin * 3);

    //this.drawLine({x: gridWidth/2, y: 0 }, {x: gridWidth/2, y: gridHeight})
    //this.drawLine({x: 0, y: gridHeight/2}, {x: gridWidth, y: gridHeight/2})
    // calculate range
    let xCount = this.options.dataPoints.length;
    let yCount = xCount;
    let xRangeMin = Math.min(...this.options.dataPoints.map(d => d.x));
    let xRangeMax = Math.max(...this.options.dataPoints.map(d => d.x));
    let xRangeDiff = (xRangeMax - xRangeMin);
    let xRatio = gridWidthMargin / xRangeDiff;
    let yRangeMin = Math.min(...this.options.dataPoints.map(d => d.y));
    let yRangeMax = Math.max(...this.options.dataPoints.map(d => d.y));
    let yRangeDiff = yRangeMax - yRangeMin;
    let yRatio = gridHeightMargin / yRangeDiff;

    this.options.dataPoints.sort((a, b) => a.x - b.x);
    

    for(let i = 0; i < this.options.dataPoints.length; i++){
      let transformedX = (this.options.dataPoints[i].x - xRangeMin) * xRatio;
      let transformedY = gridHeightMargin - ((this.options.dataPoints[i].y - yRangeMin)*yRatio);
      this.drawCircle({x: transformedX, y:  transformedY }, { radius: this.options.graph.pointRadius, strokeColor: this.options.graph.pointStrokeColor, fillColor: this.options.graph.pointFillColor, lineThickness: this.options.graph.lineThickness});
      if(i < this.options.dataPoints.length-1){
        let nextTransformedX = (this.options.dataPoints[i+1].x - xRangeMin) * xRatio;
        let nextTransformedY = gridHeightMargin - ((this.options.dataPoints[i+1].y - yRangeMin)*yRatio);
        this.drawLine({x: transformedX, y: transformedY}, {x: nextTransformedX, y: nextTransformedY}, { thickness: this.options.graph.lineThickness, strokeColor: this.options.graph.lineColor })
      }
      this.drawText({x: transformedX, y: transformedY-(this.options.graph.fontSize+10) }, `${this.options.dataPoints[i].y.toString()} ${this.options.axisY.suffix}`, { direction: 'horizontal', alignment: 'center', font: this.options.graph.font, fontSize: this.options.graph.fontSize, color: this.options.graph.fontColor })

      //this.drawCircle({x:0,y:0}, {radius: 2, strokeColor: "red", fillColor: "red", lineThickness: 1});
      this.ctx.save();
      //this.ctx.translate(-(this.options.canvas.margin/3), -(this.options.canvas.margin/3));
      this.ctx.translate(-this.options.canvas.margin/2,-this.options.canvas.margin);
      //this.drawCircle({x:0,y:0}, {radius: 2, strokeColor: "black", fillColor: "black", lineThickness: 1});
      //this.drawCircle({x:0,y:gridHeight}, {radius: 2, strokeColor: "black", fillColor: "black", lineThickness: 1});
      this.drawLine({x: 0, y: transformedY + (this.options.canvas.margin)}, {x: gridWidth, y: transformedY + (this.options.canvas.margin)}, { thickness: this.options.graph.helperLinesThickness, strokeColor: this.options.graph.lineColor+"40"});
      this.ctx.restore();
    }
    // Helpers
    if(this.options.graph.showHelperLines){
      
    }

    
  }



  private drawLine(start: ChartCoordinate, end: ChartCoordinate, options?: { thickness?: number, strokeColor?: string }){
    this.ctx.lineWidth = options.thickness;
    this.ctx.beginPath();
    this.ctx.strokeStyle = options.strokeColor;
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
  }
  private drawText(pos: ChartCoordinate, text: string, options?: { direction?: 'horizontal' | 'vertical', alignment?: CanvasTextAlign, fontSize?: number, font?: string, color?: string }){
    this.ctx.save();
    this.ctx.translate(pos.x, pos.y);
    this.ctx.font =  `${options.fontSize}px ${options.font}`;
    this.ctx.fillStyle = options.color;
    
    if(options.alignment){
      this.ctx.textAlign = options.alignment
    }
    if(options.direction === "horizontal"){
      this.ctx.textBaseline = "top";
    } else{
      this.ctx.textBaseline = "bottom";
      this.ctx.rotate(-Math.PI/2);
    }

    this.ctx.fillText(text, 0, 0);
    this.ctx.restore()
  }
  private drawCircle(pos: ChartCoordinate, options: { radius: number, strokeColor: string, fillColor: string, lineThickness: number }){
    this.ctx.beginPath();
    this.ctx.strokeStyle = options.strokeColor;
    this.ctx.fillStyle = options.fillColor;
    this.ctx.lineWidth = options.lineThickness;
    this.ctx.arc(pos.x, pos.y, options.radius , 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  }
}
