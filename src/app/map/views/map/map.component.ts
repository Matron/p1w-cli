import { AfterViewInit, Component, ElementRef, Input, NgZone, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { IMapObject } from '@data/models/event';
import { Entity } from '@ecs/models/entity';
import { MouseListenerComponent } from '@map/components/mouse-listener-component';
import { MapBackground } from '@map/entities/map-background';
import { MapObject } from '@map/entities/map-object';
import { IMapData } from '@map/models/map-data';
import { CanvasComponent } from '../canvas/canvas.component';
import { Vector2d } from '@map/models/vector-2d';

@Component({
  selector: 'map-container',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapContainer extends Entity implements AfterViewInit, OnChanges {
  
  @ViewChild('mapCanvas', { static: true })
  canvasElement: CanvasComponent;

  @Input()
  mapDetails: IMapData | undefined;

  @Input()
  mapObjects: IMapObject[] | null;

  private _background: MapBackground | null = null;
  //private _layers: MapLayer[] = [];
  private _mapObjects: MapObject[] = [];

  private _mouseListener: MouseListenerComponent;
  
  private _lastTimeStamp = 0;

  constructor(private _ngZone: NgZone) {
    super();
  }

  ngAfterViewInit(): void {
    if (this.mapDetails) this.awake();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    let newMap = changes['mapDetails'];
    let newObjects = changes['mapObjects'];

    if (newMap && !newMap.firstChange) {
      this._clearMap();
      this.awake();
    }

    if(newObjects && !newObjects.firstChange) {
      this._mapObjects = [];
      for (const obj of this.mapObjects!) {
        const mo = new MapObject(obj.position, this)
        this._mapObjects.push(mo);
        mo.awake();
      }

    }
  }
  
  public override awake(): void {
      console.log('awake MapContainer with ', this.mapDetails);
      
      this._mouseListener = new MouseListenerComponent();
      this.addComponent(this._mouseListener);

      super.awake();

      if (this.mapDetails?.backgroundImage) {
        this._background = new MapBackground(this.mapDetails, this);
      }
      this._background?.awake();

      /* this._layers.push(new MapLayer());
      for (const layer of this._layers) {
        layer.awake();
      } */

      for (const obj of this.mapObjects!) {
        this._mapObjects.push(new MapObject(obj.position, this));
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

  onClick(e: MouseEvent): void {
    this._mouseListener.onClick(e);
  }
  
  onMouseDown(e: MouseEvent): void {
    this._mouseListener.onMouseDown(e);
  }
  
  onMouseLeave(e: MouseEvent): void {
    this._mouseListener.onMouseLeave(e);
  }

  onMouseMove(e: MouseEvent): void {
    this._mouseListener.onMouseMove(e);
  }
  
  onMouseUp(e: MouseEvent): void {
    this._mouseListener.onMouseUp(e);
  }

  public getOffset(): Vector2d {
    const pos = this._background?.getBackgroundPosition();
    return pos ? new Vector2d(pos.x, pos.y) : new Vector2d(0, 0);
  }

  getElement(): ElementRef<any> {
    return this.canvasElement.canvas;
  }

  private _clearMap():void {
    this._background = null;
    //this._layers = [];
    this._mapObjects = [];
    this._components = [];
  }

}
