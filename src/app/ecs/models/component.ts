import { IAwake } from "@ecs/lifecycle/awake";
import { IUpdate } from "@ecs/lifecycle/update";
import { Entity } from "./entity";

export interface IComponent extends IAwake, IUpdate {
  entity: Entity | null;
}
