import { Vector2d } from "@map/models/vector-2d";

export interface IEventData {
  readonly id: number;
  readonly name: string;
  readonly startDate: number;
  readonly endDate: number;
  readonly mapObjectsData: IMapObjectData[];
  readonly layerId?: number;
}

export interface IMapObjectData {
  readonly name: string;
  readonly position: Vector2d;
}