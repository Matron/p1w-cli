import { Entity } from '@ecs/models/entity';
import { DrawMapObjectComponent } from '@map/components/draw-map-object';
import { Vector2d } from '@map/models/vector-2d';

export class MapObject extends Entity {
  constructor(private _position: Vector2d) {
    super();
  }

  override awake(): void {
    this.addComponent(new DrawMapObjectComponent());
    super.awake();
  }
}
