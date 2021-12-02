import { ChartCoordinate, CircleOptions, LineOptions, RectOptions, TextOptions } from './chart.types';

export class ChartOptions {
  canvas: CanvasOptions;
  axisX: AxisOptions;
  axisY: AxisOptions;
  dataPoints: ChartDataPoint[];
  graph: GraphOptions;

  constructor(canvasOptions?: CanvasOptions, xAxisOptions?: AxisOptions, yAxisOptions?: AxisOptions, graphOptions?: GraphOptions, dataPoints?: ChartDataPoint[]) {
    this.canvas = {
      width: canvasOptions?.width ? canvasOptions.width : '400px',
      height: canvasOptions?.height ? canvasOptions.height : '200px',
      margin: canvasOptions?.margin > 0 ? canvasOptions.margin : 50,
      backgroundColor: canvasOptions?.backgroundColor ? canvasOptions.backgroundColor : '#FFFFFF'
    };
    this.axisX = {
      title: xAxisOptions?.title ? xAxisOptions.title : "AxisX",
      suffix: xAxisOptions?.suffix ? xAxisOptions.suffix : null,
      titleTextOptions: {
        alignment: xAxisOptions?.titleTextOptions?.alignment ? xAxisOptions.titleTextOptions.alignment : 'center',
        font: xAxisOptions?.titleTextOptions?.font ? xAxisOptions.titleTextOptions.font : 'Verdana',
        fontSize: xAxisOptions?.titleTextOptions?.fontSize ? xAxisOptions.titleTextOptions.fontSize : 20,
        fontWeight: xAxisOptions?.titleTextOptions?.fontWeight ? xAxisOptions.titleTextOptions.fontWeight : 'bold',
        color: xAxisOptions?.titleTextOptions?.color ? xAxisOptions.titleTextOptions.color : '#000000',
        direction: xAxisOptions?.titleTextOptions?.direction ? xAxisOptions.titleTextOptions.direction : "horizontal",
        baseLine: xAxisOptions?.titleTextOptions?.baseLine ? xAxisOptions.titleTextOptions.baseLine : "top"
      },
      axisOptions: {
        axisLineOptions: {
          strokeColor: xAxisOptions?.axisOptions?.axisLineOptions?.strokeColor ? xAxisOptions.axisOptions.axisLineOptions.strokeColor : "#000000",
          thickness: xAxisOptions?.axisOptions?.axisLineOptions?.thickness ? xAxisOptions.axisOptions.axisLineOptions.thickness : 1
        },
        arrowOptions: {
          showArrow: xAxisOptions?.axisOptions?.arrowOptions?.showArrow ? xAxisOptions.axisOptions.arrowOptions.showArrow : true,
          arrowSize: xAxisOptions?.axisOptions?.arrowOptions?.arrowSize ? xAxisOptions.axisOptions.arrowOptions.arrowSize : 10
        },
        showAxisIntersect: xAxisOptions?.axisOptions?.showAxisIntersect === false ? false : true
      },
      helperOptions: {
        showHelperLines: xAxisOptions?.helperOptions?.showHelperLines === false ? false : true,
        helperLineOptions: {
          thickness: xAxisOptions?.helperOptions?.helperLineOptions?.thickness ? xAxisOptions.helperOptions.helperLineOptions.thickness : 1,
          strokeColor: xAxisOptions?.helperOptions?.helperLineOptions?.strokeColor ? xAxisOptions.helperOptions.helperLineOptions.strokeColor : "grey",
          type: xAxisOptions?.helperOptions?.helperLineOptions?.type ? xAxisOptions.helperOptions.helperLineOptions.type : 'dashed'
        }
      },
      axisValues: {
        showAxisValues: xAxisOptions?.axisValues?.showAxisValues ? xAxisOptions.axisValues.showAxisValues : false,
        axisValuesTextOptions: {
          alignment: xAxisOptions?.axisValues?.axisValuesTextOptions?.alignment ? xAxisOptions.axisValues.axisValuesTextOptions.alignment : 'center',
          font: xAxisOptions?.axisValues?.axisValuesTextOptions?.font ? xAxisOptions.axisValues.axisValuesTextOptions.font : 'Verdana',
          fontSize: xAxisOptions?.axisValues?.axisValuesTextOptions?.fontSize ? xAxisOptions.axisValues.axisValuesTextOptions.fontSize : 14,
          fontWeight: xAxisOptions?.axisValues?.axisValuesTextOptions?.fontWeight ? xAxisOptions.axisValues.axisValuesTextOptions.fontWeight : 'normal',
          color: xAxisOptions?.axisValues?.axisValuesTextOptions?.color ? xAxisOptions.axisValues.axisValuesTextOptions.color : '#000000',
          direction: xAxisOptions?.axisValues?.axisValuesTextOptions?.direction ? xAxisOptions.axisValues.axisValuesTextOptions.direction : "horizontal",
          baseLine: xAxisOptions?.axisValues?.axisValuesTextOptions.baseLine ? xAxisOptions.axisValues.axisValuesTextOptions.baseLine : "top"
        },
        marginFromAxis: xAxisOptions?.axisValues?.marginFromAxis ? xAxisOptions.axisValues.marginFromAxis : 10
      }
    };
    this.axisY = {
      title: yAxisOptions?.title ? yAxisOptions.title : "AxisY",
      suffix: yAxisOptions?.suffix ? yAxisOptions.suffix : null,
      titleTextOptions: {
        alignment: yAxisOptions?.titleTextOptions?.alignment ? yAxisOptions.titleTextOptions.alignment : 'center',
        font: yAxisOptions?.titleTextOptions?.font ? yAxisOptions.titleTextOptions.font : 'Verdana',
        fontSize: yAxisOptions?.titleTextOptions?.fontSize ? yAxisOptions.titleTextOptions.fontSize : 20,
        fontWeight: yAxisOptions?.titleTextOptions?.fontWeight ? yAxisOptions.titleTextOptions.fontWeight : 'bold',
        color: yAxisOptions?.titleTextOptions?.color ? yAxisOptions.titleTextOptions.color : '#000000',
        direction: yAxisOptions?.titleTextOptions?.direction ? yAxisOptions.titleTextOptions.direction : "vertical",
        baseLine: yAxisOptions?.titleTextOptions?.baseLine ? yAxisOptions.titleTextOptions.baseLine : "top"
      },
      axisOptions: {
        axisLineOptions: {
          strokeColor: yAxisOptions?.axisOptions?.axisLineOptions?.strokeColor ? yAxisOptions.axisOptions.axisLineOptions.strokeColor : "#000000",
          thickness: yAxisOptions?.axisOptions?.axisLineOptions?.thickness ? yAxisOptions.axisOptions.axisLineOptions.thickness : 1
        },
        arrowOptions: {
          showArrow: yAxisOptions?.axisOptions?.arrowOptions?.showArrow ? yAxisOptions.axisOptions.arrowOptions.showArrow : true,
          arrowSize: yAxisOptions?.axisOptions?.arrowOptions?.arrowSize ? yAxisOptions.axisOptions.arrowOptions.arrowSize : 10
        },
        showAxisIntersect: yAxisOptions?.axisOptions?.showAxisIntersect === false ? false : true
      },
      helperOptions: {
        showHelperLines: yAxisOptions?.helperOptions?.showHelperLines === false ? false : true,
        helperLineOptions: {
          thickness: yAxisOptions?.helperOptions?.helperLineOptions?.thickness ? yAxisOptions.helperOptions.helperLineOptions.thickness : 1,
          strokeColor: yAxisOptions?.helperOptions?.helperLineOptions?.strokeColor ? yAxisOptions.helperOptions.helperLineOptions.strokeColor : "grey",
          type: yAxisOptions?.helperOptions?.helperLineOptions?.type ? yAxisOptions.helperOptions.helperLineOptions.type : 'dashed'
        }
      },
      axisValues: {
        showAxisValues: yAxisOptions?.axisValues?.showAxisValues ? yAxisOptions.axisValues.showAxisValues : false,
        axisValuesTextOptions: {
          alignment: yAxisOptions?.axisValues?.axisValuesTextOptions?.alignment ? yAxisOptions.axisValues.axisValuesTextOptions.alignment : 'right',
          font: yAxisOptions?.axisValues?.axisValuesTextOptions?.font ? yAxisOptions.axisValues.axisValuesTextOptions.font : 'Verdana',
          fontSize: yAxisOptions?.axisValues?.axisValuesTextOptions?.fontSize ? yAxisOptions.axisValues.axisValuesTextOptions.fontSize : 14,
          fontWeight: yAxisOptions?.axisValues?.axisValuesTextOptions?.fontWeight ? yAxisOptions.axisValues.axisValuesTextOptions.fontWeight : 'normal',
          color: yAxisOptions?.axisValues?.axisValuesTextOptions?.color ? yAxisOptions.axisValues.axisValuesTextOptions.color : '#000000',
          direction: yAxisOptions?.axisValues?.axisValuesTextOptions?.direction ? yAxisOptions.axisValues.axisValuesTextOptions.direction : "horizontal",
          baseLine: yAxisOptions?.axisValues?.axisValuesTextOptions.baseLine ? yAxisOptions.axisValues.axisValuesTextOptions.baseLine : "middle"
        },
        marginFromAxis: yAxisOptions?.axisValues?.marginFromAxis ? yAxisOptions.axisValues.marginFromAxis : 10
      }
    };
    this.graph = {
      margin: graphOptions?.margin ? graphOptions.margin : 20,
      textOptions: {
        fontSize: graphOptions?.textOptions?.fontSize ? graphOptions.textOptions.fontSize : 20,
        font: graphOptions?.textOptions?.font ? graphOptions.textOptions.font : 'Verdana',
        color: graphOptions?.textOptions?.color ? graphOptions.textOptions.color : '#000000',
      },
      dataCircleOptions: {
        radius: graphOptions?.dataCircleOptions?.radius ? graphOptions.dataCircleOptions.radius : 10,
        strokeColor: graphOptions?.dataCircleOptions?.strokeColor ? graphOptions.dataCircleOptions.strokeColor : '#000000',
        fillColor: graphOptions?.dataCircleOptions?.fillColor ? graphOptions.dataCircleOptions.fillColor : 'grey',
        lineThickness: graphOptions?.dataCircleOptions?.lineThickness ? graphOptions.dataCircleOptions.lineThickness : 2

      },
      dataLineOptions: {
        thickness: graphOptions?.dataLineOptions?.thickness ? graphOptions.dataLineOptions.thickness : 2,
        strokeColor: graphOptions?.dataLineOptions?.strokeColor || "black"
      },
      averageOptions: {
        showAverage: graphOptions?.averageOptions?.showAverage ? graphOptions.averageOptions.showAverage : false,
        averageLineOptions: {
          strokeColor: graphOptions?.averageOptions?.averageLineOptions?.strokeColor ? graphOptions.averageOptions.averageLineOptions.strokeColor : "#ff0000",
          thickness: graphOptions?.averageOptions?.averageLineOptions?.thickness ? graphOptions.averageOptions.averageLineOptions.thickness : 1
        }
      },
      tooltipOptions: {
        textOptions: {
          fontSize: graphOptions?.tooltipOptions?.textOptions?.fontSize ? graphOptions.tooltipOptions.textOptions.fontSize : 12,
          fontWeight: graphOptions?.tooltipOptions?.textOptions?.fontWeight ? graphOptions.tooltipOptions.textOptions.fontWeight : "normal",
          color: graphOptions?.tooltipOptions?.textOptions?.color ? graphOptions.tooltipOptions.textOptions.color : '#000000',
          direction: graphOptions?.tooltipOptions?.textOptions?.direction ? graphOptions.tooltipOptions.textOptions.direction : "horizontal",
          alignment: graphOptions?.tooltipOptions?.textOptions?.alignment ? graphOptions.tooltipOptions.textOptions.alignment : "center",
          baseLine: graphOptions?.tooltipOptions?.textOptions?.baseLine ? graphOptions.tooltipOptions.textOptions.baseLine : "top"
        },
        rectOptions: {
          strokeColor: graphOptions?.tooltipOptions?.rectOptions?.strokeColor ? graphOptions.tooltipOptions.rectOptions.strokeColor : '#000000',
          fillColor: graphOptions?.tooltipOptions?.rectOptions?.fillColor ? graphOptions.tooltipOptions.rectOptions.fillColor : '#00FF00',
          shadowBlur: graphOptions?.tooltipOptions?.rectOptions?.shadowBlur ? graphOptions.tooltipOptions.rectOptions.shadowBlur : null,
          shadowColor: graphOptions?.tooltipOptions?.rectOptions?.shadowColor ? graphOptions.tooltipOptions.rectOptions.shadowColor : "black",
          cornerRadius: graphOptions?.tooltipOptions?.rectOptions?.cornerRadius ? graphOptions.tooltipOptions.rectOptions.cornerRadius : 5
        },
        padding: graphOptions?.tooltipOptions?.padding ? graphOptions.tooltipOptions.padding : 10,
        marginFromPoint: graphOptions?.tooltipOptions?.marginFromPoint ? graphOptions.tooltipOptions.marginFromPoint : 20
      }
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
    suffix?: string;
    titleTextOptions?: TextOptions,
    axisOptions?: {
      axisLineOptions?: LineOptions,
      arrowOptions?: {
        showArrow?: boolean,
        arrowSize?: number
      },
      showAxisIntersect?: boolean
    },
    helperOptions?: {
      showHelperLines?: boolean,
      helperLineOptions?: LineOptions
    },
    axisValues?: {
      showAxisValues?: boolean;
      axisValuesTextOptions?: TextOptions;
      marginFromAxis?: number;
    }
}
export interface GraphOptions {
    margin?: number;
    textOptions?: TextOptions;
    dataCircleOptions?: CircleOptions;
    dataLineOptions?: LineOptions;
    averageOptions?: { 
      showAverage?: boolean, 
      averageLineOptions?: LineOptions
    },
    tooltipOptions?: { 
      textOptions?: TextOptions,
      padding?: number,
      marginFromPoint?: number,
      rectOptions?: RectOptions
    }
}

export interface ChartDataPoint {
  original: ChartCoordinate;
  transformered?: ChartCoordinate;
  display: { x: string, y: string };
}