import { AfterViewInit, Component, ElementRef, Input, NgZone, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { IMapObject } from '@data/models/event';
import { Entity } from '@ecs/models/entity';
import { MapBackground } from '@map/entities/map-background';
import { MapObject } from '@map/entities/map-object';
import { IMapData } from '@map/models/map-data';
import { Vector2d } from '@map/models/vector-2d';
import { CanvasComponent } from '../canvas/canvas.component';

@Component({
  selector: 'map-container',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends Entity implements AfterViewInit, OnChanges {
  
  @ViewChild('mapCanvas', { static: true })
  canvasElement: CanvasComponent;

  @Input()
  mapDetails: IMapData | undefined;

  @Input()
  mapObjects: IMapObject[] | null;
  
  private _background: MapBackground | null = null;
  //private _layers: MapLayer[] = [];
  private _mapObjects: MapObject[] = [];
  
  private _lastTimeStamp = 0;

  private _dragging = false;
  private _offsetX: number;
  private _offsetY: number;

  constructor(private _ngZone: NgZone) {
    super();
  }

  ngAfterViewInit(): void {
    if (this.mapDetails) this.awake();
    console.log('elementRef is ', this.canvasElement.canvas.nativeElement ); 
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
      console.log('Awaking map with ', this.mapDetails);
      
      super.awake();

      if (this.mapDetails?.backgroundImage) {
        this._background = new MapBackground(this.mapDetails);
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
      this._ngZone.runOutsideAngular(() => window.requestAnimationFrame(() => this.update()) );
  }

  private _clearMap():void {
    this._background = null;
    //this._layers = [];
    this._mapObjects = [];
  }

  onMouseDown(e: MouseEvent): void {
    if (this._background) {    
      const startPos =  this._background.getBackgroundPosition();
      this._offsetX =  e.clientX - startPos.x;
      this._offsetY =  e.clientY - startPos.y;

      this._dragging = true
    }
  }
  
  onMouseUp(e: MouseEvent): void {
    this._dragging = false;
  }

  onMouseMove(e: MouseEvent): void {
    if (this._dragging && this._background) {    
      const localPos = this._calcLocalPointFrom({ x: e.clientX,y:  e.clientY});
      if (localPos){
        this._background.setBackgroundPosition(new Vector2d( e.clientX - this._offsetX, e.clientY - this._offsetY));
      }
    }
  }

  onMouseLeave(e: MouseEvent): void {
    this._dragging = false;
  }

  private _calcLocalPointFrom(globalPoint: Vector2d): Vector2d | null {
    const elementRect = this.canvasElement.canvas.nativeElement.getBoundingClientRect();
    const x = globalPoint.x - elementRect.left;
    const y = globalPoint.y - elementRect.top - 2;

    if(x < 0 || y < 0){
      return null
    }

    return new Vector2d(x, y)
  }
}
