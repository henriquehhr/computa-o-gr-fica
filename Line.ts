import Point from "./Point";

export default class Line {
  public points: Point[];
  public strokeStyle: string;
  public lineWidth: number;

  constructor(strokeStyle: string, lineWidth: number) {
    this.points = [];
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  getContextForDrawing() {
    return {
      strokeStyle: this.strokeStyle,
      lineWidth: this.lineWidth
    };
  }
}