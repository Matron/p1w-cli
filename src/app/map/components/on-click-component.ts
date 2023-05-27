import { IComponent } from "@ecs/models/component";
import { Entity } from "@ecs/models/entity";
import { Vector2d } from "@map/models/vector-2d";

export abstract class OnClickComponent implements IComponent {
  public abstract entity: Entity | null;

  public abstract awake(): void;

  public abstract update(deltaTime: number): void;

  public abstract click(globalPoint: Vector2d, localPoint: Vector2d | null): void;

  public abstract mouseDown(globalPoint: Vector2d, localPoint: Vector2d | null): void;
  
  public abstract mouseLeave(globalPoint: Vector2d, localPoint: Vector2d | null): void;

  public abstract mouseMove(globalPoint: Vector2d, localPoint: Vector2d | null): void;
  
  public abstract mouseUp(globalPoint: Vector2d, localPoint: Vector2d | null): void;
}
