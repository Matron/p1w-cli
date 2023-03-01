import { IMapData } from "@map/models/map-data";

export interface IScenario {
  id: number,
  name: string,
  description: string,
  startDate: number,
  mapData: IMapData
}
