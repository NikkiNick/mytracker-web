export declare type LineOptions = {
    thickness?: number, 
    strokeColor?: string
}
export declare type TextOptions = {
    direction?: 'horizontal' | 'vertical', 
    alignment?: CanvasTextAlign, 
    fontSize?: number, 
    font?: string, 
    color?: string
}
export declare type CircleOptions = {
    radius?: number, 
    strokeColor?: string, 
    fillColor?: string, 
    lineThickness?: number
}
export declare type ChartCoordinate = {
    x: number;
    y: number;
}
export declare type RectOptions = {
    fillColor?: string;
    strokeColor?: string;
    width: number;
    height: number;
    alignment?: CanvasTextAlign;
    text?: string;
    fontSize?: number;
    font?: string;
}