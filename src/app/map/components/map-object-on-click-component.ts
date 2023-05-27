import { Vector2d } from "@map/models/vector-2d";
import { OnClickComponent } from "./on-click-component";
import { MapBackground } from "@map/entities/map-background";
import { MouseListenerComponent } from "./mouse-listener-component";

export class MapObjectOnClickComponent extends OnClickComponent {
  public override entity: MapBackground | null;

  constructor(mouseListener: MouseListenerComponent) {
    super();
    mouseListener.subscribe(this);
  }

  public override awake(): void {
    console.log("Method not implemented.");
  }
  public override update(deltaTime: number): void {
    console.log("Method not implemented.");
  }

  public override click(point: Vector2d): void {
    console.log("click not implemented.");
  }

  public override mouseDown(point: Vector2d): void {
    console.log("Method not implemented.");
  }
  public override mouseLeave(point: Vector2d): void {
    console.log("Method not implemented.");
  }
  public override mouseMove(point: Vector2d): void {
    console.log("Method not implemented.");
  }
  public override mouseUp(point: Vector2d): void {
    console.log("Method not implemented.");
  }

}
