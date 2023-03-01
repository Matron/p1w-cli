import { Component } from '@angular/core';
import { BehaviorSubject, of, switchMap, tap } from 'rxjs';
import { DataService } from '@data/data.service';

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
            console.log('we have new scenario data: ', data);
          })
        )
      } else {
        return of(undefined)
      }
    })
  )

  constructor(
    private dataService: DataService,
  ) {}
}
