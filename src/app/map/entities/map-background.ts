import { Entity } from "@ecs/models/entity";
import { BackgroundOnClickComponent } from "@map/components/background-on-click-component";
import { DrawBackgroundComponent } from "@map/components/draw-background";
import { MouseListenerComponent } from "@map/components/mouse-listener-component";
import { IMapData } from "@map/models/map-data";
import { Vector2d } from "@map/models/vector-2d";
import { MapContainer } from "@map/views/map/map.component";

export class MapBackground extends Entity{

  // background position relative to the canvas
  private _backgroundPosition = new Vector2d(0,0);
  private _backgroundSize = new Vector2d(0,0);

  constructor(private _mapData: IMapData, private _map: MapContainer) {
    super();
    this._backgroundPosition = _mapData.startingPosition;
  }

  public override awake(): void {
    if (this._mapData.backgroundImage) {
      this.addComponent(new DrawBackgroundComponent(this._mapData?.backgroundImage));
      this.addComponent(new BackgroundOnClickComponent(this._map.getComponent(MouseListenerComponent)));
    }    
    super.awake();
  }

  public getBackgroundPosition(): Vector2d {
    
    return this._backgroundPosition;
  }

  public setBackgroundPosition(pos: Vector2d) {
    this._backgroundPosition = pos;
  }

  public getBackgroundSize(): Vector2d {
    return this._backgroundSize;
  }

  public setBackgroundSize(size: Vector2d) {
    this._backgroundSize = size;
  }

}
