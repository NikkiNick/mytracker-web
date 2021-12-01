import { ChartCoordinate, CircleOptions, LineOptions, RectOptions, TextOptions } from './chart.types';

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
      suffix: xAxisOptions.suffix,
      titleTextOptions: {
        alignment: xAxisOptions.titleTextOptions.alignment || 'center',
        font: xAxisOptions.titleTextOptions.font || 'Verdana',
        fontSize: xAxisOptions.titleTextOptions.fontSize || 20,
        fontWeight: xAxisOptions.titleTextOptions.fontWeight || 'normal',
        color: xAxisOptions.titleTextOptions.color || '#000000',
        direction: xAxisOptions.titleTextOptions.direction || "vertical"
      },
      axisOptions: {
        axisLineOptions: {
          strokeColor: xAxisOptions.axisOptions.axisLineOptions.strokeColor || "#000000",
          thickness: xAxisOptions.axisOptions.axisLineOptions.thickness || 1
        },
        arrowOptions: {
          showArrow: xAxisOptions.axisOptions.arrowOptions.showArrow || true,
          arrowSize: xAxisOptions.axisOptions.arrowOptions.arrowSize || 10
        },
        showAxisIntersect: xAxisOptions.axisOptions.showAxisIntersect !== undefined ? yAxisOptions.axisOptions.showAxisIntersect : true
      },
      helperOptions: {
        showHelperLines: xAxisOptions.helperOptions.showHelperLines || true,
        helperLineOptions: {
          thickness: xAxisOptions.helperOptions.helperLineOptions.thickness || 1,
          strokeColor: xAxisOptions.helperOptions.helperLineOptions.strokeColor || "#00000050",
          type: xAxisOptions.helperOptions.helperLineOptions.type || 'dashed'
        }
      },
      axisValues: {
        showAxisValues: xAxisOptions.axisValues.showAxisValues || false,
        axisValuesTextOptions: {
          alignment: xAxisOptions.axisValues.axisValuesTextOptions.alignment || 'center',
          font: xAxisOptions.axisValues.axisValuesTextOptions.font || 'Verdana',
          fontSize: xAxisOptions.axisValues.axisValuesTextOptions.fontSize || 14,
          fontWeight: xAxisOptions.axisValues.axisValuesTextOptions.fontWeight || 'normal',
          color: xAxisOptions.axisValues.axisValuesTextOptions.color || '#000000',
          direction: xAxisOptions.axisValues.axisValuesTextOptions.direction || "horizontal"
        }
      }
    };
    this.axisY = {
      title: yAxisOptions.title,
      suffix: yAxisOptions.suffix,
      titleTextOptions: {
        alignment: yAxisOptions.titleTextOptions.alignment || 'center',
        font: yAxisOptions.titleTextOptions.font || 'Verdana',
        fontSize: yAxisOptions.titleTextOptions.fontSize || 20,
        fontWeight: yAxisOptions.titleTextOptions.fontWeight || 'normal',
        color: yAxisOptions.titleTextOptions.color || '#000000',
        direction: yAxisOptions.titleTextOptions.direction || "vertical"
      },
      axisOptions: {
        axisLineOptions: {
          strokeColor: yAxisOptions.axisOptions.axisLineOptions.strokeColor || "#000000",
          thickness: yAxisOptions.axisOptions.axisLineOptions.thickness || 1
        },
        arrowOptions: {
          showArrow: yAxisOptions.axisOptions.arrowOptions.showArrow || true,
          arrowSize: yAxisOptions.axisOptions.arrowOptions.arrowSize || 10
        },
        showAxisIntersect: yAxisOptions.axisOptions.showAxisIntersect !== undefined ? yAxisOptions.axisOptions.showAxisIntersect : true
      },
      helperOptions: {
        showHelperLines: yAxisOptions.helperOptions.showHelperLines || true,
        helperLineOptions: {
          thickness: yAxisOptions.helperOptions.helperLineOptions.thickness || 1,
          strokeColor: yAxisOptions.helperOptions.helperLineOptions.strokeColor || "#00000050",
          type: yAxisOptions.helperOptions.helperLineOptions.type || 'dashed'
        }
      },
      axisValues: {
        showAxisValues: yAxisOptions.axisValues.showAxisValues || false,
        axisValuesTextOptions: {
          alignment: yAxisOptions.axisValues.axisValuesTextOptions.alignment || 'center',
          font: yAxisOptions.axisValues.axisValuesTextOptions.font || 'Verdana',
          fontSize: yAxisOptions.axisValues.axisValuesTextOptions.fontSize || 14,
          fontWeight: yAxisOptions.axisValues.axisValuesTextOptions.fontWeight || 'normal',
          color: yAxisOptions.axisValues.axisValuesTextOptions.color || '#000000',
          direction: yAxisOptions.axisValues.axisValuesTextOptions.direction || "horizontal"
        }
      }
    };
    this.graph = {
      margin: graphOptions.margin !== undefined ? graphOptions.margin : 20,
      textOptions: {
        fontSize: graphOptions.textOptions.fontSize || 20,
        font: graphOptions.textOptions.font || 'Verdana',
        color: graphOptions.textOptions.color || '#000000',
      },
      dataCircleOptions: {
        radius: graphOptions.dataCircleOptions.radius || 10,
        strokeColor: graphOptions.dataCircleOptions.strokeColor || '#000000',
        fillColor: graphOptions.dataCircleOptions.fillColor || 'grey',
        lineThickness: graphOptions.dataCircleOptions.lineThickness || 2

      },
      dataLineOptions: {
        thickness: graphOptions.dataLineOptions.thickness || 2,
        strokeColor: graphOptions.dataLineOptions.strokeColor || "black"
      },
      averageOptions: {
        showAverage: graphOptions.averageOptions.showAverage || false,
        averageLineOptions: {
          strokeColor: graphOptions.averageOptions.averageLineOptions.strokeColor || "#ff0000",
          thickness: graphOptions.averageOptions.averageLineOptions.thickness || 1
        }
      },
      tooltipOptions: {
        textOptions: {
          fontSize: graphOptions.tooltipOptions.textOptions.fontSize || 12,
          fontWeight: graphOptions.tooltipOptions.textOptions.fontWeight || "normal",
          color: graphOptions.tooltipOptions.textOptions.color || '#000000',
          direction: graphOptions.tooltipOptions.textOptions.direction || "horizontal",
          alignment: graphOptions.tooltipOptions.textOptions.alignment || "center"
        },
        rectOptions: {
          strokeColor: graphOptions.tooltipOptions.rectOptions.strokeColor || '#000000',
          fillColor: graphOptions.tooltipOptions.rectOptions.fillColor || '#00FF00',
          shadowBlur: graphOptions.tooltipOptions.rectOptions.shadowBlur || null,
          cornerRadius: graphOptions.tooltipOptions.rectOptions.cornerRadius || 5
        }
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
      rectOptions?: RectOptions
    }
}
