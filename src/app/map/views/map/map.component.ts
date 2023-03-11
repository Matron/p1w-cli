import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IMapObject } from '@data/models/event';
import { Entity } from '@ecs/models/entity';
import { MapBackground } from '@map/entities/map-background';
import { MapLayer } from '@map/entities/map-layer';
import { MapObject } from '@map/entities/map-object';
import { IMapData } from '@map/models/map-data';
import { Vector2d } from '@map/models/vector-2d';

@Component({
  selector: 'map-container',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends Entity implements AfterViewInit, OnChanges {
  
  @Input()
  mapDetails: IMapData | undefined;

  @Input()
  mapObjects: IMapObject[] | null;
  
  private _background: MapBackground | null = null;
  //private _layers: MapLayer[] = [];
  private _mapObjects: MapObject[] = [];
  
  private _lastTimeStamp = 0;

  ngAfterViewInit(): void {
    console.log('Awaking map with ', this.mapDetails);
    if (this.mapDetails) this.awake();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    let newMap = changes['mapDetails'];
    let newMP = changes['mapObjects'];

    if (newMap && !newMap.firstChange) {
      this._clearMap();
      this.awake();
    }

    if(newMP && !newMP.firstChange) {
      this._mapObjects = [];
      for (const obj of this.mapObjects!) {
        const mo = new MapObject(obj.position)
        this._mapObjects.push(mo);
        mo.awake();
      }
    }
  }
  
  public override awake(): void {
      super.awake();
      if (this.mapDetails?.backgroundImage) {
        this._background = new MapBackground(this.mapDetails.backgroundImage);
      }
      this._background?.awake();

      /* this._layers.push(new MapLayer());
      for (const layer of this._layers) {
        layer.awake();
      } */

      for (const obj of this.mapObjects!) {
        this._mapObjects.push(new MapObject(obj.position));
      }

      window.requestAnimationFrame(() => {
        console.log('map - start animation loop');
        
        this._lastTimeStamp = Date.now();
        this.update();
      });
  }

  public override update(): void {
      const deltaTime = (Date.now() - this._lastTimeStamp) / 1000;
      
      super.update(deltaTime);

      this._background?.update(deltaTime);

      /* for (const layer of this._layers) {
        layer.update(deltaTime);
      } */

      
      for (const obj of this._mapObjects) {
        obj.update(deltaTime);
      }
      
      this._lastTimeStamp = Date.now();
      window.requestAnimationFrame(() => this.update());
  }

  private _clearMap():void {
    this._background = null;
    //this._layers = [];
    this._mapObjects = [];
  }
}
