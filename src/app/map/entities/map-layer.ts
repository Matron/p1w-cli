import { Entity } from "@ecs/models/entity";
import { Vector2d } from "@map/models/vector-2d";
import { MapObject } from "./map-object";

export class MapLayer extends Entity {

  private _mapObjects: MapObject[] = [];

  public override awake(): void {
      // add mapObjects
      this._mapObjects.push(new MapObject(new Vector2d(100, 100)));
      this._mapObjects.push(new MapObject(new Vector2d(200, 200)));

      for (const mapObject of this._mapObjects) {
        mapObject.awake();
      }
  }

  public override update(deltaTime: number): void {
    for (const mapObject of this._mapObjects) {
      mapObject.update(deltaTime);
    }
  }

}
