import { Component } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { DataService } from '@data/services/data.service';
import { IEventData, IMapObjectData } from '@data/models/event';
import { ClockService } from './clock/clock.service';
import { IScenarioData } from '@data/models/scenario';
import { IMapLayerData } from '@data/models/map-layer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private _events: IEventData[];
  private _nextEvent: IEventData | null;
  
  public currentScenario: IScenarioData | undefined;
  
  public scenarioList$ = this._dataService.scenarios$;

  public actionSelectScenario$ = new BehaviorSubject<number | null>(null);
  public actionSelectedLayer$ = new BehaviorSubject<number | null>(null);

  public events$ = new BehaviorSubject<IEventData[]>([]);
  public layers$ = new BehaviorSubject<IMapLayerData[]>([]);
  
  public currentTime$ = this._clock.tick$.pipe(
    tap(time => {
      this._updateEvents(time)
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
              this._loadEvents(data.events);
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
    private _dataService: DataService,
    public _clock: ClockService,
  ) {}

  private _checkForOldEvents(time: number, events: IEventData[]): boolean {
    let updated = false;
    let i = events.length;

    while (i--) {
      if (events[i].endDate < time) {
        events.splice(i, 1);        
        updated = true;
      }
    }
    return updated;
  }

  private _checkForNewEvents(time: number, currentEvents: IEventData[]): boolean {
    let updated = false;
    if (!this._nextEvent) return updated;

    if (this._nextEvent.startDate <= time ) {
      currentEvents.push(this._nextEvent);
      this._prepareNextEvent(this._nextEvent);
      updated = true;
    }
    return updated;
  }

  private _loadEvents(eventsData: IEventData[]): void {
    // TODO: do we need this? maybe we can get away with just _updateEvents()...
    const startTime = this.currentScenario?.startDate;
    if (!startTime) return;

    this._events = eventsData;
    console.log('here we need to sort the events by start date');
    
    const startingEvents: IEventData[] = [];
    let nextEventIndex = 0;

    for (let i = 0; i < this._events.length; i++) {
      const evt = this._events[i];
      
      if (evt.startDate <= startTime && evt.endDate >= startTime) {
        startingEvents.push(evt);
        nextEventIndex = i + 1;
      }
    }

    this._nextEvent = this._events[nextEventIndex];
    this.events$.next(startingEvents);
    this._updateLayers(startingEvents); 
  }

  private _prepareNextEvent(currentEvent: IEventData): void {
    for (let i=0; i < this._events.length; i++) {
      if(this._events[i].id === currentEvent.id) {
        this._nextEvent = this._events[i+1];
      }
    }
  }

  private _updateEvents(time: number): void {
    const currentEvents = this.events$.value

    let removedEvents = this._checkForOldEvents(time, currentEvents);
    let addedEvents = this._checkForNewEvents(time, currentEvents);

    if (removedEvents || addedEvents) {
      this.events$.next(currentEvents);
      this._updateLayers(currentEvents);      
    }
  }

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
