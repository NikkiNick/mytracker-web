import { CanvasConfig } from '../canvas/canvas.config';
import { AxisOptions, CanvasOptions, ChartDataPoint, ChartOptions, GraphOptions } from '../canvas/canvas.types';

export class ChartConfig extends CanvasConfig{
	chart: ChartOptions;
  data: ChartDataPoint[];

  constructor(canvasOptions?: CanvasOptions, xAxisOptions?: AxisOptions, yAxisOptions?: AxisOptions, graphOptions?: GraphOptions, chartOptions?: ChartOptions, data?: ChartDataPoint[]) {
    super(canvasOptions, xAxisOptions, yAxisOptions, graphOptions);
    this.data = data;
    this.chart = {
      dataCircleOptions: {
        radius: chartOptions?.dataCircleOptions?.radius ? chartOptions.dataCircleOptions.radius : 10,
        strokeColor: chartOptions?.dataCircleOptions?.strokeColor ? chartOptions.dataCircleOptions.strokeColor : '#000000',
        fillColor: chartOptions?.dataCircleOptions?.fillColor ? chartOptions.dataCircleOptions.fillColor : 'grey',
        lineThickness: chartOptions?.dataCircleOptions?.lineThickness ? chartOptions.dataCircleOptions.lineThickness : 2
      },
      dataLineOptions: {
        thickness: chartOptions?.dataLineOptions?.thickness ? chartOptions.dataLineOptions.thickness : 2,
        strokeColor: chartOptions?.dataLineOptions?.strokeColor || "black"
      },
      averageOptions: {
        showAverage: chartOptions?.averageOptions?.showAverage ? chartOptions.averageOptions.showAverage : false,
        averageLineOptions: {
          strokeColor: chartOptions?.averageOptions?.averageLineOptions?.strokeColor ? chartOptions.averageOptions.averageLineOptions.strokeColor : "#ff0000",
          thickness: chartOptions?.averageOptions?.averageLineOptions?.thickness ? chartOptions.averageOptions.averageLineOptions.thickness : 1
        }
      }
    };
  }
}