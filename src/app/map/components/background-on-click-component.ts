import { MapBackground } from "@map/entities/map-background";
import { Vector2d } from "@map/models/vector-2d";
import { MouseListenerComponent } from "./mouse-listener-component";
import { OnClickComponent } from "./on-click-component";

export class BackgroundOnClickComponent extends OnClickComponent {

  entity: MapBackground;
  private _dragging: boolean;
  private _offsetY: number;
  private _offsetX: number;

  constructor(mouseListener: MouseListenerComponent) {
    super();
    mouseListener.subscribe(this);
  }

  awake(): void {
    console.log('awake BackgroundOnClickComponent');
  }

  update(deltaTime: number): void {}
  
  public click(globalPoint: Vector2d, localPoint: Vector2d): void {
    if (this._clickedOnBackground(localPoint)) {

      console.log('map clicked at ');
    } else {
      console.log('clicked outside map');
      
    }

  }

  public mouseDown(point: Vector2d): void {
    if (this._clickedOnBackground(point)) {
      const startPos =  this.entity.getBackgroundPosition();
      this._offsetX =  point.x - startPos.x;
      this._offsetY =  point.y - startPos.y;
      this._dragging = true  
    }
  }

  public mouseLeave(point: Vector2d): void {
    this._dragging = false;
  }

  public mouseMove(position: Vector2d): void {
    if (this._dragging) {    
      this.entity.setBackgroundPosition(new Vector2d( position.x - this._offsetX, position.y - this._offsetY));
    }
  }

  public mouseUp(point: Vector2d): void {
    this._dragging = false;
  }

  /* private _calcLocalPointFrom(globalPoint: Vector2d): Vector2d | null {
    const elementRect = this.entity.canvasElement.canvas.nativeElement.getBoundingClientRect();
    const x = globalPoint.x - elementRect.left;
    const y = globalPoint.y - elementRect.top - 2;

    if(x < 0 || y < 0){
      return null
    }

    return new Vector2d(x, y)
  } */

  private _clickedOnBackground(localPoint: Vector2d): boolean {
    const mapPointX = localPoint.x - this.entity.getBackgroundPosition().x;
    const mapPointY = localPoint.y - this.entity.getBackgroundPosition().y;

    if (
      (mapPointX < 0 || mapPointX > this.entity.getBackgroundSize().x)
      || ( mapPointY < 0 || mapPointY > this.entity.getBackgroundSize().y)
     ) { 
      return false
    } 
    return true; 
  }
}
