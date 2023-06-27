import { Entity } from "@ecs/models/entity";
import { MapObject } from "./map-object";
import { IMapObjectData } from "@data/models/event";
import { MapContainer } from "@map/views/map/map.component";

export class MapLayer extends Entity {
  public name: string;
  public isActive: boolean;

  private _mapObjects: MapObject[] = [];

  constructor(name: string, isActive: boolean, private _map: MapContainer) {
    super();
    //TODO: refactor below
    this.name = name;
    this.isActive = isActive;
  }

  public override awake(): void {
    for (const mapObject of this._mapObjects) {
      mapObject.awake();
    }
  }

  public override update(deltaTime: number): void {
    for (const mapObject of this._mapObjects) {
      mapObject.update(deltaTime);
    }
  }

  public addMapObjects(mapObjects: IMapObjectData[]): void {
    for (const obj of mapObjects) {
      this._mapObjects.push(new MapObject(obj.position, this._map));
    }
  }
}
