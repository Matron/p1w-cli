import { Entity } from '@ecs/models/entity';
import { DrawMapObjectComponent } from '@map/components/draw-map-object';
import { Vector2d } from '@map/models/vector-2d';
import { MapBackground } from './map-background';
import { MapObjectOnClickComponent } from '@map/components/map-object-on-click-component';
import { MapContainer } from '@map/views/map/map.component';

export class MapObject extends Entity {

  constructor(private _position: Vector2d, private _container: MapContainer ) {
    super();
  }

  public override awake(): void {
    this.addComponent(new DrawMapObjectComponent());
    //this.addComponent(new MapObjectOnClickComponent(this.));
    super.awake();
  }

  public getPosition(): Vector2d {
    const mapX = this._position.x; // + this._container.getOffset().x;
    const mapY = this._position.y; // + this._container.getOffset().y;
    return new Vector2d(mapX, mapY);
  }
}
