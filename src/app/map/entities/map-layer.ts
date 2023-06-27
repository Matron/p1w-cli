import { Entity } from "@ecs/models/entity";
import { MapObject } from "./map-object";
import { IMapObjectData } from "@data/models/event";
import { MapContainer } from "@map/views/map/map.component";
import { IMapLayerData } from "@data/models/map-layer";

export class MapLayer extends Entity {
  
  public readonly name: string;
  public readonly isActive: boolean;
  
  private _mapObjects: MapObject[] = [];

  constructor(layerData: IMapLayerData, private _map: MapContainer) {
    super();
    this.name = layerData.name;
    this.isActive = layerData.isActive;
    if (layerData.mapObjectsData) {
      this._addMapObjects(layerData.mapObjectsData);
    }
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

  private _addMapObjects(mapObjects: IMapObjectData[]): void {
    for (const obj of mapObjects) {
      this._mapObjects.push(new MapObject(obj.position, this._map));
    }
  }
}
