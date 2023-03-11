import { IComponent } from "@ecs/models/component";
import { MapObject } from "@map/entities/map-object";
import { Vector2d } from "@map/models/vector-2d";
import { Graphics } from "@map/services/graphics";

export class DrawMapObjectComponent implements IComponent {
  entity: MapObject | null;

  awake(): void {
    this._clear();
  }
  
  update(deltaTime: number): void {
    this._clear();
    this._draw();
  }

  private _clear(): void {

  }

  private _draw(): void {
    Graphics.drawCircle(this.entity?.getPosition()!, 10, 'darkgreen');
  }
}
