import { Component } from '@angular/core';
import { BehaviorSubject, of, switchMap, tap } from 'rxjs';
import { DataService } from './data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public scenarioList$ = this.dataService.scenarios$;
  
  public actionSelectScenario$ = new BehaviorSubject<number | null>(null);
  public currentScenario$ = this.actionSelectScenario$.pipe(
    switchMap(id => {
      if (id) {
        return this.dataService.loadScenario(id).pipe(
          tap(data => {
            console.log('we have data ', data);
            console.log('time to init the engine, the map and the clock!');
          })
        )
      } else {
        return of(undefined)
      }
    })
  )

  constructor(private dataService: DataService) {}
}
