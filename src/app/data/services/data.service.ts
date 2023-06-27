import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataModule } from '../data.module';
import { mockScenarioList, getScenario } from '../db/db';
import { IScenarioData } from '../models/scenario';
import { IScenarioListItem } from '../models/scenario-list-item';

@Injectable({
  providedIn: DataModule
})
export class DataService {

  constructor() { }

  public scenarios$ = new BehaviorSubject<IScenarioListItem[]>(mockScenarioList);

  public loadScenario(scenarioId: number): Observable<IScenarioData | undefined> {
    return getScenario(scenarioId)
  }
}
