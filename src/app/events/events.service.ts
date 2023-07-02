import { Injectable } from '@angular/core';
import { IEventData } from '@data/models/event';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  public events$ = new BehaviorSubject<IEventData[]>([]);

  private _events: IEventData[] = [];
  private _nextEvent: IEventData | null;
  
  constructor() { }

  public loadEvents(eventsData: IEventData[], startTime: number): void {
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
  }

  public updateEvents(time: number): void {
    const currentEvents = this.events$.value

    let removedEvents = this._checkForOldEvents(time, currentEvents);
    let addedEvents = this._checkForNewEvents(time, currentEvents);

    if (removedEvents || addedEvents) {
      this.events$.next(currentEvents);
    }
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

  private _prepareNextEvent(currentEvent: IEventData): void {
    for (let i=0; i < this._events.length; i++) {
      if(this._events[i].id === currentEvent.id) {
        this._nextEvent = this._events[i+1];
      }
    }
  }
}
