import { Entity } from "@ecs/models/entity";
import { DrawBackgroundComponent } from "@map/components/draw-background";

export class MapBackground extends Entity{

  constructor(private _backgroundImage: string) {
    super();
  }

  public override awake(): void {
    this.addComponent(new DrawBackgroundComponent(this._backgroundImage));
    super.awake();
  }
}
