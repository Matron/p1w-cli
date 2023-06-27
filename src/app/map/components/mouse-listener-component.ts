import { IComponent } from "@ecs/models/component";
import { Entity } from "@ecs/models/entity";
import { Vector2d } from "@map/models/vector-2d";
import { OnClickComponent } from "./on-click-component";
import { MapContainer } from "@map/views/map/map.component";

export class MouseListenerComponent implements IComponent {
  entity: MapContainer | null;

  private _subscribers: OnClickComponent[] = [];

  public awake(): void {}

  public update(deltaTime: number): void {}

  public subscribe(component: OnClickComponent): void {
    this._subscribers.push(component);
  }

  public onClick(e: MouseEvent): void {
    const globalPoint = new Vector2d(e.clientX, e.clientY);
    console.log('clicked at ' + globalPoint.x + ' ' + globalPoint.y);

    const localPoint = this._calcLocalPointFrom(new Vector2d(e.clientX, e.clientY));
    console.log('local pos is ' + localPoint?.x + ' ' + localPoint?.y );
    
    for (const comp of this._subscribers) {
      comp.click(globalPoint, localPoint);
    }
  }

  public onMouseDown(e: MouseEvent): void {
    const globalPoint = new Vector2d(e.clientX, e.clientY);
    const localPoint = this._calcLocalPointFrom(new Vector2d(e.clientX, e.clientY));
    for (const comp of this._subscribers) {
      comp.mouseDown(globalPoint, localPoint);
    }
  }

  public onMouseLeave(e: MouseEvent): void {
    const globalPoint = new Vector2d(e.clientX, e.clientY);
    const localPoint = this._calcLocalPointFrom(new Vector2d(e.clientX, e.clientY));
    for (const comp of this._subscribers) {
      comp.mouseLeave(globalPoint, localPoint);
    }
  }

  public onMouseMove(e: MouseEvent): void {
    const globalPoint = new Vector2d(e.clientX, e.clientY);
    const localPoint = this._calcLocalPointFrom(new Vector2d(e.clientX, e.clientY));
    for (const comp of this._subscribers) {
      comp.mouseMove(globalPoint, localPoint);
    }
  }

  public onMouseUp(e: MouseEvent): void {
    const globalPoint = new Vector2d(e.clientX, e.clientY);
    const localPoint = this._calcLocalPointFrom(new Vector2d(e.clientX, e.clientY));
    for (const comp of this._subscribers) {
      comp.mouseUp(globalPoint, localPoint);
    }
  }

  private _calcLocalPointFrom(globalPoint: Vector2d): Vector2d | null {
    const elementRect = this.entity?.getElement()?.nativeElement?.getBoundingClientRect();
    if (elementRect) {
      const x = globalPoint.x - elementRect.left;
      const y = globalPoint.y - elementRect.top - 2;
      return new Vector2d(x, y)
    }
    return null;
  } 
  
}
