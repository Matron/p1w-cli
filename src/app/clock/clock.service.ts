import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClockModule } from './clock.module';

@Injectable({
  providedIn: ClockModule
})
export class ClockService {
  
  private _timer: any = null;
  private _interval = 1000;
  private _currentTick = 0;

  public tick$ = new BehaviorSubject<number>(this._currentTick);
  
  constructor() {}

  public isActive(): boolean {
    return this._timer !== null;
  }

  public start(startDate?: number): void {
    if (startDate) {
      this._currentTick = startDate;
    }
    if (this._timer !== null) return;
    this._timer = setInterval(() => {
      this._currentTick++;
      this.tick$.next(this._currentTick);
    }, this._interval);
  }

  public stop(): void {
    if (this._timer !== null) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }
}
