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
  
  public click(globalPoint: Vector2d, localPoint: Vector2d): void {}

  public mouseDown(globalPoint: Vector2d, localPoint: Vector2d): void {
    if (this._clickedOnBackground(localPoint)) {
      const startPos =  this.entity.getBackgroundPosition();
      this._offsetX =  localPoint.x - startPos.x;
      this._offsetY =  localPoint.y - startPos.y;
      this._dragging = true
      console.log('offestX ', this._offsetX);
      console.log('offestY ', this._offsetY);
      
    }
  }

  public mouseLeave(point: Vector2d): void {
    this._dragging = false;
  }

  public mouseMove(globalPoint: Vector2d, localPoint: Vector2d): void {
    if (this._dragging) {    
      this.entity.setBackgroundPosition(new Vector2d( localPoint.x - this._offsetX, localPoint.y - this._offsetY));
    }
  }

  public mouseUp(point: Vector2d): void {
    this._dragging = false;
  }

  private _clickedOnBackground(localPoint: Vector2d): boolean {
    const size = this.entity.getBackgroundSize();
    const position = this.entity.getBackgroundPosition();

    if (localPoint.x < position.x || localPoint.y < position.y) {
      return false;
    }

    if( localPoint.x > (size.x + position.x) || localPoint.y > (size.y + position.y) ){
      return false
    }

    return true; 
  }
}
