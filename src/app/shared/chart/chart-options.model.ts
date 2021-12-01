import { ChartCoordinate } from './chart.types';

export class ChartOptions {
  canvas: CanvasOptions;
  axisX: AxisOptions;
  axisY: AxisOptions;
  dataPoints: ChartCoordinate[];
  graph: GraphOptions;

  constructor(canvasOptions?: CanvasOptions, xAxisOptions?: AxisOptions, yAxisOptions?: AxisOptions, graphOptions?: GraphOptions, dataPoints?: ChartCoordinate[]) {
    this.canvas = {
      width: canvasOptions.width || '400px',
      height: canvasOptions.height || '200px',
      margin: canvasOptions.margin > 0 ? canvasOptions.margin : 50,
      backgroundColor: canvasOptions.backgroundColor || '#FFFFFF'
    };
    this.axisX = {
      title: xAxisOptions.title,
      titleAlignment: xAxisOptions.titleAlignment || 'center',
      titleFont: xAxisOptions.titleFont || 'Verdana',
      titleFontSize: xAxisOptions.titleFontSize || 20,
      thickness: xAxisOptions.thickness || 1,
      color: xAxisOptions.color || '#000000',
      showArrow: xAxisOptions.showArrow !== undefined ? xAxisOptions.showArrow : true,
      arrowSize: xAxisOptions.arrowSize || 10,
      showAxisIntersect: xAxisOptions.showAxisIntersect !== undefined ? xAxisOptions.showAxisIntersect : true,
      //axisBlockLineSize: xAxisOptions.axisBlockLineSize || 10,
      suffix: xAxisOptions.suffix,
      showHelperLines: xAxisOptions.showHelperLines || true,
      helperLinesThickness: xAxisOptions.helperLinesThickness || 1,
      helperLinesColor: xAxisOptions.helperLinesColor || '#00000050',
    };
    this.axisY = {
      title: yAxisOptions.title,
      titleAlignment: yAxisOptions.titleAlignment || 'center',
      titleFont: yAxisOptions.titleFont || 'Verdana',
      titleFontSize: yAxisOptions.titleFontSize || 20,
      thickness: yAxisOptions.thickness || 1,
      color: yAxisOptions.color || '#000000',
      showArrow: yAxisOptions.showArrow !== undefined ? yAxisOptions.showArrow : true,
      arrowSize: yAxisOptions.arrowSize || 10,
      showAxisIntersect: yAxisOptions.showAxisIntersect !== undefined ? yAxisOptions.showAxisIntersect : true,
      //axisBlockLineSize: yAxisOptions.axisBlockLineSize || 10,
      suffix: yAxisOptions.suffix,
      showHelperLines: yAxisOptions.showHelperLines || true,
      helperLinesThickness: yAxisOptions.helperLinesThickness || 1,
      helperLinesColor: yAxisOptions.helperLinesColor || '#00000050',
    };
    this.graph = {
      margin: graphOptions.margin !== undefined ? graphOptions.margin : 20,
      pointRadius: graphOptions.pointRadius || 10,
      pointStrokeColor: graphOptions.pointStrokeColor || '#000000',
      pointFillColor: graphOptions.pointFillColor || 'grey',
      lineThickness: graphOptions.lineThickness || 2,
      lineColor: graphOptions.lineColor || '#000000',
      fontSize: graphOptions.fontSize || 20,
      font: graphOptions.font || 'Verdana',
      fontColor: graphOptions.fontColor || '#000000',
      showAverage: graphOptions.showAverage || false,
      averageColor: graphOptions.averageColor || '#FF0000',
      averageThickness: graphOptions.averageThickness || 1,
      tooltipFontSize: graphOptions.tooltipFontSize || 12,
      tooltipFontColor: graphOptions.tooltipFontColor || '#000000',
      tooltipStrokeColor: graphOptions.tooltipStrokeColor || '#000000',
      tooltipBackground: graphOptions.tooltipBackground || '#00FF00'
    };
    this.dataPoints = dataPoints;
  }
}

export interface CanvasOptions {
    margin?: number;
    width?: string;
    height?: string;
    backgroundColor?: string;
}
export interface AxisOptions {
    title?: string;
    titleAlignment?: CanvasTextAlign;
    titleFont?: string;
    titleFontSize?: number;
    thickness?: number;
    color?: string;
    showArrow?: boolean;
    arrowSize?: number;
    showAxisIntersect?: boolean,
    //axisBlockLineSize?: number;
    suffix?: string;
    showHelperLines?: boolean;
    helperLinesThickness?: number;
    helperLinesColor?: string;
}
export interface GraphOptions {
    margin?: number;
    pointRadius?: number;
    pointStrokeColor?: string;
    pointFillColor?: string;
    lineThickness?: number;
    lineColor?: string;
    fontSize?: number;
    font?: string;
    fontColor?: string;
    showAverage?: boolean;
    averageColor?: string;
    averageThickness?: number;
    tooltipFontSize?: number;
    tooltipBackground?: string;
    tooltipFontColor?: string;
    tooltipStrokeColor?: string;
}
