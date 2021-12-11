import { CanvasConfig } from "../canvas/canvas.config";
import { CanvasOptions, AxisOptions, GraphOptions, StackedBarData, StackedBarChartOptions } from "../canvas/canvas.types";

export class StackedBarChartConfig extends CanvasConfig {
  stackedBarChart: StackedBarChartOptions;
	data: StackedBarData[];

	constructor(canvasOptions?: CanvasOptions, xAxisOptions?: AxisOptions, yAxisOptions?: AxisOptions, graphOptions?: GraphOptions, stackedBarChart?: StackedBarChartOptions, data?: StackedBarData[]) {
		super(canvasOptions, xAxisOptions, yAxisOptions, graphOptions);
		this.data = data;

    // Setup Stacked Bar Chart options
    this.stackedBarChart = {
      totals: {
        showTotals: stackedBarChart?.totals?.showTotals === true ? true :  false,
        marginFromBar: stackedBarChart?.totals?.marginFromBar ? stackedBarChart.totals.marginFromBar : 20,
        suffix: stackedBarChart?.totals?.suffix ? stackedBarChart.totals.suffix : "",
        textOptions: {
          fontSize: stackedBarChart?.totals?.textOptions?.fontSize ? stackedBarChart.totals.textOptions.fontSize : 12,
          fontWeight: stackedBarChart?.totals?.textOptions?.fontWeight ? stackedBarChart.totals.textOptions.fontWeight : "normal",
          color: stackedBarChart?.totals?.textOptions?.color ? stackedBarChart.totals.textOptions.color : '#000000',
          alignment: stackedBarChart?.totals.textOptions?.alignment ? stackedBarChart.totals.textOptions.alignment : "left"
        }
      }
    };
	}
}