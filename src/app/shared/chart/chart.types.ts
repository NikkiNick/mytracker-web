export declare interface LineOptions {
    thickness?: number;
    strokeColor?: string;
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
    alignment?: CanvasTextAlign;
    text?: string;
    fontSize?: number;
    font?: string;
}
