import { IMapData } from "@map/models/map-data";
import { IEvent } from "./event";
import { IMapLayer } from "./map-layer";

export interface IScenario {
  id: number,
  description: string,
  events: IEvent[],
  layers: IMapLayer[],
  mapData: IMapData,
  name: string,
  source: string
  startDate: number,
}
