import { Component } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { DataService } from '@data/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public scenarioList$ = this._dataService.scenarios$;
  
  public actionSelectScenario$ = new BehaviorSubject<number | null>(null);
  public currentScenario$ = this.actionSelectScenario$.pipe(
    distinctUntilChanged(),
    switchMap(id => {
      if (id) {
        return this._dataService.loadScenario(id).pipe(
          tap(data => {
            console.log('switchMap - currentScenrio$ - we have new scenario data: ', data);
          })
        )
      } else {
        return of(undefined)
      }
    })
  )

  constructor(
    private _dataService: DataService,
  ) {}
}
