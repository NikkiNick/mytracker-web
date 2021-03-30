import { HammerGestureConfig } from "@angular/platform-browser";

export class ChartCoordinate{
    x: number;
    y: number;
  }

export class ChartOptions {
    canvas: CanvasOptions;
    axisX: AxisOptions;
    axisY: AxisOptions;
    dataPoints: ChartCoordinate[];
    graph: GraphOptions;

    constructor(canvasOptions?: CanvasOptions, xAxisOptions?: AxisOptions, yAxisOptions?: AxisOptions, graphOptions?: GraphOptions,dataPoints?: ChartCoordinate[]){
        this.canvas = {
            width: canvasOptions.width || "400px",
            height: canvasOptions.height || "200px",
            margin: canvasOptions.margin || 50,
            backgroundColor: canvasOptions.backgroundColor || "#FFFFFF"
        }
        this.axisX = {
            title: xAxisOptions.title || "Axis title",
            titleAlignment: xAxisOptions.titleAlignment || "center",
            titleFont: xAxisOptions.titleFont || "Verdana",
            titleFontSize: xAxisOptions.titleFontSize || 20,
            thickness: xAxisOptions.thickness || 1,
            color: xAxisOptions.color || "#000000",
            axisBlockLineSize: xAxisOptions.axisBlockLineSize || 10,
            suffix: xAxisOptions.suffix || ''
        }
        this.axisY = {
            title: yAxisOptions.title || "Axis title",
            titleAlignment: yAxisOptions.titleAlignment || "center",
            titleFont: yAxisOptions.titleFont || "Verdana",
            titleFontSize: yAxisOptions.titleFontSize || 20,
            thickness: yAxisOptions.thickness || 1,
            color: yAxisOptions.color || "#000000",
            axisBlockLineSize: yAxisOptions.axisBlockLineSize || 10,
            suffix: yAxisOptions.suffix || ''
        }
        this.graph = {
            pointRadius: graphOptions.pointRadius || 10,
            pointStrokeColor: graphOptions.pointStrokeColor || "#000000",
            pointFillColor: graphOptions.pointFillColor || "grey",
            lineThickness: graphOptions.lineThickness || 2,
            lineColor: graphOptions.lineColor || "#000000",
            showHelperLines: graphOptions.showHelperLines || true,
            helperLinesThickness: graphOptions.helperLinesThickness || 1,
            fontSize: graphOptions.fontSize || 20,
            font: graphOptions.font || "Verdana",
            fontColor: graphOptions.fontColor || "#000000"
        }
        this.dataPoints = dataPoints;
    }
}

export interface CanvasOptions{
    margin?: number;
    width?: string;
    height?: string;
    backgroundColor?: string;
}
export interface AxisOptions{
    title?: string;
    titleAlignment?: CanvasTextAlign;
    titleFont?: string;
    titleFontSize?: number;
    thickness?: number;
    color?: string;
    axisBlockLineSize?: number;
    suffix?: string;
}
export interface GraphOptions{
    pointRadius?: number;
    pointStrokeColor?: string;
    pointFillColor?: string;
    lineThickness?: number;
    lineColor?: string;
    showHelperLines?: boolean;
    helperLinesThickness?: number;
    fontSize?: number;
    font?: string;
    fontColor?: string;
}