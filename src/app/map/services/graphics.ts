import { Vector2d } from "@map/models/vector-2d";

export class Graphics {

  private static _ctx: CanvasRenderingContext2D | null;

  private constructor() {}

  public static setContext(ctx: CanvasRenderingContext2D): void {
    console.log('graphics service - got context ', ctx);
    this._ctx = ctx;
  }

  public static drawImage(image: CanvasImageSource): void {
    this._ctx?.drawImage(image, 0, 0);
/*     if (this._ctx) {
      this._ctx.fillStyle = 'blue';
      this._ctx?.fillRect(0, 0, 100, 100);
    } */
  }

  public static drawCircle(center: Vector2d, radius: number, color = 'red'): void {
    if (this._ctx) {
      this._ctx.beginPath();
      this._ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
      this._ctx.fillStyle = color;
      this._ctx.fill();
    }
  }

  public static clearCanvas(): void {
    this._ctx?.clearRect(0, 0, this._ctx.canvas.clientWidth, this._ctx.canvas.clientHeight);
  }

  public static clearRect(start: Vector2d, size: Vector2d): void {
    this._ctx?.clearRect(start.x, start.y, size.x, size.y);
  }
}
