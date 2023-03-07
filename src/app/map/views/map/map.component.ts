import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Entity } from '@ecs/models/entity';
import { MapBackground } from '@map/entities/map-background';
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
  
  private _entities: Entity[] = [];
  private _mapObjects: MapObject[] = [];
  
  private _lastTimeStamp = 0;

  ngAfterViewInit(): void {
    console.log('Awaking map with ', this.mapDetails);
    if (this.mapDetails) this.awake();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    let newMap = changes['mapDetails'];

    if (!newMap.firstChange) {
      this._clearMap();
      this.awake();
    }
  }

  
  public override awake(): void {
      super.awake();
      if (this.mapDetails?.backgroundImage) {
        this._entities.push(new MapBackground(this.mapDetails.backgroundImage));
      }

      this._mapObjects.push(new MapObject(new Vector2d(100, 100)));

      for (const entity of this._entities) {
        entity.awake();
      }

      for (const mapObject of this._mapObjects) {
        mapObject.awake();
      }

      window.requestAnimationFrame(() => {
        console.log('map - start animation loop');
        
        this._lastTimeStamp = Date.now();
        this.update();
      })
  }

  public override update(): void {
      const deltaTime = (Date.now() - this._lastTimeStamp) / 1000;
      
      super.update(deltaTime);

      for (const entity of this._entities) {
        entity.update(deltaTime);
      }

      for (const mapObject of this._mapObjects) {
        mapObject.update(deltaTime);
      }
      
      this._lastTimeStamp = Date.now();
      window.requestAnimationFrame(() => this.update());
  }

  private _clearMap():void {
    this._entities = [];
  }
}
