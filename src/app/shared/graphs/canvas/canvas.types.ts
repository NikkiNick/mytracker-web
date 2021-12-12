/*
*	CONFIG OPTIONS
*/
export declare type CanvasOptions = {
  margin?: number;
  width?: string;
  height?: string;
  backgroundColor?: string;
}
export declare type GraphOptions = {
  margin?: number;
  textOptions?: TextOptions;
  tooltipOptions?: { 
    textOptions?: TextOptions,
    padding?: number,
    marginFromPoint?: number,
    rectOptions?: RectOptions
  }
}
export declare type ChartOptions = {
	dataCircleOptions?: CircleOptions;
	dataLineOptions?: LineOptions;
	averageOptions?: { 
		showAverage?: boolean, 
		averageLineOptions?: LineOptions
	}
}
export declare type StackedBarChartOptions = {
  totals?: {
    showTotals?: boolean;
    suffix?: string;
    marginFromBar?: number;
    textOptions?: TextOptions;
  }
  gutterSize?: number;
}
export declare type AxisOptions = {
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
export declare type TextOptions = {
  direction?: 'horizontal' | 'vertical';
  alignment?: CanvasTextAlign;
	baseLine?: CanvasTextBaseline;
  fontSize?: number;
  font?: string;
	fontWeight?: 'normal' | 'bold' | 'lighter',
  color?: string;
}
export declare type LineOptions = {
  thickness?: number;
  strokeColor?: string;
	type?: "solid" | "dashed"
}
export declare type RectOptions = {
  fillColor?: string;
  strokeColor?: string;
  width?: number;
  height?: number;
	cornerRadius?: number;
	shadowColor?: string;
	shadowBlur?: number;
  lineThickness?: number;
}
export declare type CircleOptions = {
  radius?: number;
  strokeColor?: string;
  fillColor?: string;
  lineThickness?: number;
}
/*
*	OTHER
*/
export declare type CanvasCoordinate = {
  x: number;
  y: number;
}
/*
* CHART
*/
export declare type ChartDataPoint = {
  original: CanvasCoordinate;
  display: { x: string, y: string };
}
export declare type StackedBarData = {
  name: string,
  stacks: StackedBarStack[];
}
export declare type StackedBarStack = {
  amount: number;
  category: string;
  color: string;
}