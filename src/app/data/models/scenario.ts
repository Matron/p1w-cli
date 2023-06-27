import { IMapData } from "@map/models/map-data";
import { IEventData } from "./event";
import { IMapLayerData } from "./map-layer";

export interface IScenarioData {
  id: number,
  description: string,
  events: IEventData[],
  layers: IMapLayerData[],
  mapData: IMapData,
  name: string,
  source: string
  startDate: number,
}
