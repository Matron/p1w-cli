import { IComponent } from "@ecs/models/component";
import { Entity } from "@ecs/models/entity";
import { Vector2d } from "@map/models/vector-2d";
import { OnClickComponent } from "./on-click-component";

export class BackgroundOnClickComponent extends OnClickComponent {

  entity: Entity | null;

  awake(): void {
    console.log('awake BackgroundOnClickComponent');
  }

  update(deltaTime: number): void {}
  
  public clickOn(point: Vector2d): void {
    throw new Error("Method not implemented.");
  }

}
