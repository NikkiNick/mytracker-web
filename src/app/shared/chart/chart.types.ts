export declare interface LineOptions {
    thickness?: number;
    strokeColor?: string;
	type?: "solid" | "dashed"
}
export declare interface TextOptions {
    direction?: 'horizontal' | 'vertical';
    alignment?: CanvasTextAlign;
	baseLine?: CanvasTextBaseline;
    fontSize?: number;
    font?: string;
	fontWeight?: 'normal' | 'bold' | 'lighter',
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
    width?: number;
    height?: number;
	cornerRadius?: number;
	shadowColor?: string;
	shadowBlur?: number;
}
