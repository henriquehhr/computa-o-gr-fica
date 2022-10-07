export default class Point {
  public x: number;
  public y: number;
  public dragging: boolean;

  constructor(x: number, y: number, dragging: boolean) {
    this.x = x;
    this.y = y;
    this.dragging = dragging;
  }
}