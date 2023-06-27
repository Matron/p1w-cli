import { IMapObjectData } from "./event";

export interface IMapLayerData {
  readonly id: number;
  isActive: boolean;
  readonly name: string;
  mapObjectsData: IMapObjectData[] | null;
}
