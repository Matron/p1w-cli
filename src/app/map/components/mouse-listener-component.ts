import { IComponent } from "@ecs/models/component";
import { Entity } from "@ecs/models/entity";
import { Vector2d } from "@map/models/vector-2d";
import { OnClickComponent } from "./on-click-component";
import { MapContainer } from "@map/views/map/map.component";

// Exposes pointer events generated on the attached entity html element
// the events are passed to all pointer handler components that are subscribed
export class MouseListenerComponent implements IComponent {
  entity: MapContainer | null;

  private _subscribers: OnClickComponent[] = [];

  public awake(): void {}

  public update(deltaTime: number): void {}

  public subscribe(component: OnClickComponent): void {
    this._subscribers.push(component);
  }

  public onMouseDown(clientX: number, clientY: number): void {
    
    const globalPoint = new Vector2d(clientX, clientY);
    const localPoint = this._calcLocalPointFrom(new Vector2d(clientX, clientY));
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

  public onMouseMove(clientX: number, clientY: number): void {
    const globalPoint = new Vector2d(clientX, clientY);
    const localPoint = this._calcLocalPointFrom(new Vector2d(clientX, clientY));
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
