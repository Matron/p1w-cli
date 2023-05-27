import { Vector2d } from "@map/models/vector-2d";

export interface IEvent {
  id: number,
  name: string,
  startDate: number,
  endDate: number,
  mapObjects: IMapObject[]
}

export interface IMapObject {
  name: string,
  position: Vector2d
}