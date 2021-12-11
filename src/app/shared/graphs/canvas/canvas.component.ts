import { ElementRef, ViewChild } from '@angular/core';
import { ICanvasConfig } from './canvas.config';
import { CanvasCoordinate, CircleOptions, LineOptions, RectOptions, TextOptions } from './canvas.types';

export class CanvasComponent {
	@ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
	@ViewChild('canvasOverlay', { static: true }) canvasOverlay: ElementRef<HTMLCanvasElement>;
	@ViewChild('canvasContainer', { static: true }) canvasContainer: ElementRef<HTMLElement>;

	protected ctx: CanvasRenderingContext2D;
	protected ctxOverlay: CanvasRenderingContext2D;
	protected config: ICanvasConfig;

  protected graphOrigin: CanvasCoordinate;
  protected graphWidth: number;
  protected graphHeight: number;

  initConfig(config: ICanvasConfig): void {   
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctxOverlay = this.canvasOverlay.nativeElement.getContext('2d');
    this.config = config;
    this.initCanvas();
  }
  private initCanvas(): void {
    // setting canvas width and height
    this.canvasContainer.nativeElement.style.width = this.config.canvas.width;
    this.canvasContainer.nativeElement.style.height = this.config.canvas.height;

    this.canvas.nativeElement.style.width = this.config.canvas.width;
    this.canvas.nativeElement.style.height = this.config.canvas.height;
    this.canvas.nativeElement.width = this.canvas.nativeElement.offsetWidth;
    this.canvas.nativeElement.height = this.canvas.nativeElement.offsetHeight;
    this.ctx.canvas.style.backgroundColor = this.config.canvas.backgroundColor;

    this.canvasOverlay.nativeElement.style.width = this.config.canvas.width;
    this.canvasOverlay.nativeElement.style.height = this.config.canvas.height;
    this.canvasOverlay.nativeElement.width = this.canvas.nativeElement.offsetWidth;
    this.canvasOverlay.nativeElement.height = this.canvas.nativeElement.offsetHeight;
  }
   /*
    HELPER METHODS
  */
  protected calculateLongestValue(items: string[], fontOptions: TextOptions): number{
    if(items && fontOptions){
      this.ctx.font = `${fontOptions.fontWeight} ${fontOptions.fontSize}px ${fontOptions.font}`;
      return Math.max(...items.map(i => this.ctx.measureText(i).width)); 
    }
    return 0;
  }
  protected calculateDistance(xA: number, yA: number, xB: number, yB: number): number {
    const xDiff: number = xA - xB;
    const yDiff: number = yA - yB;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  }
  protected drawLine(ctx: CanvasRenderingContext2D, start: CanvasCoordinate, end: CanvasCoordinate, config?: LineOptions): void {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = config.thickness;
    if(config.type === "dashed"){
      ctx.setLineDash([10,10]);
    }
    ctx.strokeStyle = config.strokeColor;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.restore();
  }
  protected drawText(ctx: CanvasRenderingContext2D, pos: CanvasCoordinate, text: string, config: TextOptions): void {
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.font = `${config.fontWeight} ${config.fontSize}px ${config.font}`;
    ctx.fillStyle = config.color;
    ctx.textAlign = config.alignment;
    ctx.textBaseline = config.baseLine;

    if (config.direction === 'vertical') {
      ctx.rotate(-Math.PI / 2);
    }
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }
  protected drawCircle(ctx: CanvasRenderingContext2D, pos: CanvasCoordinate, config?: CircleOptions): void {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = config.strokeColor;
    ctx.fillStyle = config.fillColor;
    ctx.lineWidth = config.lineThickness;
    ctx.arc(pos.x, pos.y, config.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
  protected drawRect(ctx: CanvasRenderingContext2D, pos: CanvasCoordinate, config?: RectOptions): void {
	ctx.save();
	ctx.beginPath();
    ctx.fillStyle = config.fillColor;
    ctx.strokeStyle = config.strokeColor;
    if(config.shadowColor && config.shadowBlur){
      ctx.shadowColor = config.shadowColor;
      ctx.shadowBlur = config.shadowBlur;
    }

    const width = config.width;
    const height = config.height;

    if(config.cornerRadius){
      if (width < 2 * config.cornerRadius) config.cornerRadius = width / 2;
      if (height < 2 * config.cornerRadius) config.cornerRadius = height / 2;
      ctx.moveTo(pos.x + config.cornerRadius, pos.y);
      ctx.arcTo(pos.x + width, pos.y, pos.x + width, pos.y + height, config.cornerRadius);
      ctx.arcTo(pos.x + width, pos.y + height, pos.x, pos.y + height, config.cornerRadius);
      ctx.arcTo(pos.x, pos.y + height, pos.x, pos.y, config.cornerRadius);
      ctx.arcTo(pos.x, pos.y, pos.x + width, pos.y, config.cornerRadius);
    } else {
      ctx.rect(pos.x, pos.y, width, height);
    }
	ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  protected drawTooltip(ctx: CanvasRenderingContext2D, pos: CanvasCoordinate, textLines: string[], tooltipOptions: { textOptions?: TextOptions, rectOptions?: RectOptions, padding?: number, marginFromPoint?: number }): void {
    ctx.save();
    ctx.fillStyle = tooltipOptions.rectOptions.fillColor;
    ctx.strokeStyle = tooltipOptions.rectOptions.strokeColor;
    ctx.font = `${tooltipOptions.textOptions.fontSize}px ${tooltipOptions.textOptions.font}`;
    // Draw rectangle
    // 1. calculate total width / height
    pos.y += tooltipOptions.marginFromPoint;
    if (textLines.length > 0) {
      const longestSize = this.calculateLongestValue(textLines, tooltipOptions.textOptions);
      tooltipOptions.rectOptions.width = longestSize + (this.config.graph.tooltipOptions.padding * 2);
      tooltipOptions.rectOptions.height = (this.config.graph.tooltipOptions.textOptions.fontSize * textLines.length) + (textLines.length > 1 ? (tooltipOptions.padding/2) * (textLines.length -1) : 0) + (tooltipOptions.padding*2);
      
      // Moving canvas cursor to corner for rectangle to start
      if(pos.x - (tooltipOptions.rectOptions.width/2) > 0){
        if(ctx.canvas.width - pos.x > tooltipOptions.rectOptions.width/2){
          ctx.translate(-tooltipOptions.rectOptions.width/2, 0);
        } else {
          ctx.translate(tooltipOptions.rectOptions.width*-1, 0);
        }
      }
      if(ctx.canvas.height - pos.y < tooltipOptions.rectOptions.height){
        pos.y -= tooltipOptions.marginFromPoint * 2;
        ctx.translate(0, (tooltipOptions.rectOptions.height * - 1 ));
      }
      // Draw rectangle
      this.drawRect(ctx, pos, tooltipOptions.rectOptions);
      // Move cursor for text
      ctx.translate(tooltipOptions.rectOptions.width/2, tooltipOptions.padding);
      // Draw text
      for(let i = 0; i < textLines.length; i++){
        this.drawText(ctx, pos, textLines[i], tooltipOptions.textOptions);
        if(i < textLines.length -1){
          ctx.translate(0, tooltipOptions.textOptions.fontSize + (tooltipOptions.padding/textLines.length));
        } 
      }
    }

    ctx.restore();
  }
}
