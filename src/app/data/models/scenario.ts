import { IMapData } from "@map/models/map-data";
import { IEvent } from "./event";

export interface IScenario {
  id: number,
  name: string,
  description: string,
  startDate: number,
  mapData: IMapData,
  events: IEvent[]
}
