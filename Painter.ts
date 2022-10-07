import Point from "./Point";
import Line from "./Line";

export default class Painter {
  private context: CanvasRenderingContext2D;
  public lines: Line[];
  public currentStrokeStyle: string;
  public currentLineWidth: number;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.lines = [];
    this.currentStrokeStyle = "#000";
    this.currentLineWidth = 5;
  }

  savePoint(x: number, y: number, dragging: boolean, area: DOMRect) {
    const point = new Point(x - area.left, y - area.top, dragging);
    if (!dragging) {
      const line = new Line(this.currentStrokeStyle, this.currentLineWidth);
      line.points.push(point);
      this.lines.push(line);
    } else {
      this.lines[this.lines.length - 1].points.push(point);
    }
  }

  drawLines() {
    this.configContextForDrawing();

    for (let i = 0; i < this.lines.length; i++) {
      let line = this.lines[i];
      for (let j = 0; j < line.points.length; j++) {
        this.context.strokeStyle = line.getContextForDrawing().strokeStyle;
        this.context.lineWidth = line.getContextForDrawing().lineWidth;
        this.context.beginPath();
        const point = line.points[j];
        if (point.dragging && j > 0) {
          const previousPoint = line.points[j - 1];
          this.context.moveTo(previousPoint.x, previousPoint.y);
        } else {
          this.context.moveTo(point.x - 1, point.y);
        }
        this.context.lineTo(point.x, point.y);
        this.context.closePath();
        this.context.stroke();
      }
    }
  }

  configContextForDrawing() {
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.strokeStyle = this.currentStrokeStyle;
    this.context.lineJoin = "round";
    this.context.lineWidth = this.currentLineWidth;
  }

  clean() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.lines = [];
  }

  revert() {
    this.lines.pop();
    this.drawLines();
  }
}