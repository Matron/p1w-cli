import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mockScenarioList, getScenario } from './db/db';
import { Scenario } from './models/scenario';
import { ScenarioListItem } from './models/scenario-list-item';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public scenarios$ = new BehaviorSubject<ScenarioListItem[]>(mockScenarioList);

  public loadScenario(scenarioId: number): Observable<Scenario | undefined> {
    return getScenario(scenarioId)
  }
}
