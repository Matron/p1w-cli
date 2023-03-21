import { Entity } from "@ecs/models/entity";
import { BackgroundOnClickComponent } from "@map/components/background-on-click-component";
import { DrawBackgroundComponent } from "@map/components/draw-background";
import { IMapData } from "@map/models/map-data";
import { Vector2d } from "@map/models/vector-2d";

export class MapBackground extends Entity{

  private _backgroundPosition = new Vector2d(0,0);

  constructor(private _mapData: IMapData) {
    super();
    this._backgroundPosition = _mapData.startingPosition;
  }

  public override awake(): void {
    if (this._mapData.backgroundImage) {
      this.addComponent(new DrawBackgroundComponent(this._mapData?.backgroundImage));
      this.addComponent(new BackgroundOnClickComponent());
    }

    super.awake();
  }

  public getBackgroundPosition(): Vector2d {
    return this._backgroundPosition;
  }

  public setBackgroundPosition(pos: Vector2d) {
    console.log('pos ', pos.x);
    
    this._backgroundPosition = pos;
  }

}
