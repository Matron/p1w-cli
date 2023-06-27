import { Component } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { DataService } from '@data/services/data.service';
import { IEventData, IMapObjectData } from '@data/models/event';
import { ClockService } from './clock/clock.service';
import { IScenarioData } from '@data/models/scenario';
import { IMapLayerData } from '@data/models/map-layer';
import { EventsService } from './events/events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public currentScenario: IScenarioData | undefined;
  
  public scenarioList$ = this._dataService.scenarios$;

  public actionSelectScenario$ = new BehaviorSubject<number | null>(null);
  public actionSelectedLayer$ = new BehaviorSubject<number | null>(null);

  public events$ = this._eventsService.events$.pipe(
    tap(events => {
      this._updateLayers(events);
    })
  )
  public layers$ = new BehaviorSubject<IMapLayerData[]>([]);
  
  public currentTime$ = this._clock.tick$.pipe(
    tap(time => {
      this._eventsService.updateEvents(time);
    })
  );

  public currentScenario$ = this.actionSelectScenario$.pipe(
    distinctUntilChanged(),
    switchMap(id => {
      if (id) {
        return this._dataService.loadScenario(id).pipe(
          tap(data => {
            console.log('------->>>>> we have new scenario data: ', data);
            if (data) {
              this.currentScenario = data; // TODO: is this ok?
              this.layers$.next([...this.currentScenario.layers]);
              this._eventsService.loadEvents(data.events, this.currentScenario.startDate);
              this._clock.start(data.startDate);
            }
          })
        )
      } else {
        return of(undefined)
      }
    })
  ).subscribe();

  // TODO: can we do this without the activeLayers$ ?
  public activeLayers$ = this.actionSelectedLayer$.pipe(
    tap(
      layerId => {
        if (!layerId) return;
        const updatedLayers = structuredClone(this.layers$.value);
        const layerIndex = updatedLayers.findIndex(((layer: IMapLayerData) => layer.id == layerId));
    
        updatedLayers[layerIndex].isActive = !updatedLayers[layerIndex].isActive;
        this.layers$.next(updatedLayers);
      }
    )
  ).subscribe(); // TODO: unsubscribe?

  constructor(
    public _clock: ClockService,
    private _dataService: DataService,
    private _eventsService: EventsService,
  ) {}

  private _updateLayers(events: IEventData[]): void {
    if (!this.currentScenario?.layers) return;
    
    const updatedLayers =  structuredClone(this.layers$.value).map((layer: IMapLayerData) => {
      return {
        ...layer,
        mapObjectsData: new Array<IMapObjectData>()
      }
    });
    
    for (const evt of events) {
      if (evt.layerId) {
        for (const layer of updatedLayers) {
          if (layer.id === evt.layerId) {
            layer.mapObjectsData!.push( ...evt.mapObjectsData );
          }
        }
      }
    }
    this.layers$.next(updatedLayers);
  }

  toggleClock(): void {
    if (this._clock.isActive()) {
      this._clock.stop();
    } else {
      this._clock.start();
    }
  }
}
