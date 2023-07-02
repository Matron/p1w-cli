import { AfterViewInit, Component, ElementRef, Input, NgZone, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Entity } from '@ecs/models/entity';
import { MouseListenerComponent } from '@map/components/mouse-listener-component';
import { MapBackground } from '@map/entities/map-background';
import { IMapData } from '@map/models/map-data';
import { CanvasComponent } from '../canvas/canvas.component';
import { Vector2d } from '@map/models/vector-2d';
import { MapLayer } from '@map/entities/map-layer';
import { IMapLayerData } from '@data/models/map-layer';

@Component({
  selector: 'map-container',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapContainer extends Entity implements AfterViewInit, OnChanges {
  
  @ViewChild('mapCanvas', { static: true })
  canvasElement: CanvasComponent;

  @Input()
  mapDetails: IMapData | null;

  @Input()
  mapLayersData: IMapLayerData[] | null;

  private _background: MapBackground | null = null;
  private _mapLayers: MapLayer[] = [];

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
    let newLayers = changes['mapLayersData']

    if (newMap && !newMap.firstChange) {
      this._clearMap();
      this.awake();
    }

    if (newLayers) {
      this._loadLayers();
    }
  }
  
  public override awake(): void {
      this._mouseListener = new MouseListenerComponent();
      this.addComponent(this._mouseListener);

      super.awake();

      if (this.mapDetails?.backgroundImage) {
        this._background = new MapBackground(this.mapDetails, this);
      }
      this._background?.awake();

      window.requestAnimationFrame(() => {
        this._lastTimeStamp = Date.now();
        this.update();
      });
  }

  public override update(): void {
      const deltaTime = (Date.now() - this._lastTimeStamp) / 1000;
      
      super.update(deltaTime);

      this._background?.update(deltaTime);

      if (this._mapLayers) {
        for (const layer of this._mapLayers) {
          if (layer.isActive) {
            layer.update(deltaTime);
          }
        }
      }
      
      this._lastTimeStamp = Date.now();
      this._ngZone.runOutsideAngular(() => window.requestAnimationFrame(() => this.update()) );
  }
  
  public onMouseLeave(e: MouseEvent): void {
    this._mouseListener.onMouseLeave(e);
  }

  public onPointerDown(e: PointerEvent): void {
    this._mouseListener.onMouseDown(e.clientX, e.clientY);
  }
  
  public onPointerUp(e: PointerEvent): void {
    this._mouseListener.onMouseUp(e);
  }

  public onPointerMove(e: PointerEvent): void {
    this._mouseListener.onMouseMove(e.clientX, e.clientY);
  }

  public onTouchMove(e: TouchEvent): void {
    this._mouseListener.onMouseMove(e.touches[0].clientX, e.touches[0].clientY);
  }
  
  public getOffset(): Vector2d {
    const pos = this._background?.getBackgroundPosition();
    return pos ? new Vector2d(pos.x, pos.y) : new Vector2d(0, 0);
  }

  public getElement(): ElementRef<any> {
    return this.canvasElement.canvas;
  }

  private _clearMap():void {
    this._background = null;
    this._mapLayers = [];
    this._components = [];
  }

  private _loadLayers(): void {
    this._mapLayers = [];
    if (!this.mapLayersData) return;
    for (const layerData of this.mapLayersData) {
      const newLayer = new MapLayer(layerData, this);
      newLayer.awake();
      this._mapLayers.push(newLayer);
    }
  }
}
