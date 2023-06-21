import { Component } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { DataService } from '@data/services/data.service';
import { IEvent, IMapObject } from '@data/models/event';
import { ClockService } from './clock/clock.service';
import { IMapLayer } from '@data/models/map-layer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private _events: IEvent[] | undefined = [];
  
  public scenarioList$ = this._dataService.scenarios$;
  
  public events$ = new BehaviorSubject<IEvent[]>([]);
  public layers$ = new BehaviorSubject<IMapLayer[] | undefined>([]);
  public mapObjects$ = new BehaviorSubject<IMapObject[]>([]);

  public actionSelectScenario$ = new BehaviorSubject<number | null>(null);
  public actionSelectedLayer$ = new BehaviorSubject<number | null>(null);

  public tick$ = this._clock.tick$.pipe(
    tap(time => {
      this._checkForEvent(time)
    })
  );

  public currentScenario$ = this.actionSelectScenario$.pipe(
    distinctUntilChanged(),
    switchMap(id => {
      if (id) {
        return this._dataService.loadScenario(id).pipe(
          tap(data => {
            console.log('switchMap - currentScenrio$ - we have new scenario data: ', data);
            this._clock.start(data?.startDate);
            this._events = data?.events;
            this.layers$.next(data?.layers!)
          })
        )
      } else {
        return of(undefined)
      }
    })
  );

  public activeLayers$ = this.actionSelectedLayer$.pipe(
    tap(
      data => console.log('toggle layer ', data)
    )
  ).subscribe(); // TODO: unsubscribe?

  constructor(
    private _dataService: DataService,
    private _clock: ClockService
  ) {}

  private _checkForEvent(time: number): void {
    if (!this._events) return;

    const eventos: IEvent[] = [];
    const mapObjects: IMapObject[] = [];

    for (const evt of this._events) {
      if (evt.startDate <= time && evt.endDate >= time) {
        eventos.push(evt);
        mapObjects.push(...evt.mapObjects);
      }
    }
    this.events$.next(eventos);
    this.mapObjects$.next(mapObjects);
  }
}
