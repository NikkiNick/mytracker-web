export declare interface LineOptions {
    thickness?: number;
    strokeColor?: string;
	type?: "solid" | "dashed"
}
export declare interface TextOptions {
    direction?: 'horizontal' | 'vertical';
    alignment?: CanvasTextAlign;
    fontSize?: number;
    font?: string;
    color?: string;
}
export declare interface CircleOptions {
    radius?: number;
    strokeColor?: string;
    fillColor?: string;
    lineThickness?: number;
}
export declare interface ChartCoordinate {
    x: number;
    y: number;
}
export declare interface RectOptions {
    fillColor?: string;
    strokeColor?: string;
    width: number;
    height: number;
	cornerRadius?: number;
	shadowColor?: string;
	shadowBlur?: number;
}
