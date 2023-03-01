import { Observable, of } from "rxjs";
import { Scenario } from "../models/scenario";
import { ScenarioListItem } from "../models/scenario-list-item";

export const mockScenarioList: ScenarioListItem[] = [
  {
    id: 1,
    name: "Scenario 1",
    description: "Description 1"
  },
  {
    id: 2,
    name: "Scenario 2",
    description: "Description 2"
  }
]

export const mockScenarios: Scenario[] = [
  {
    id: 1,
    name: "Scenario 1",
    description: "Description 1",
    startDate: 1,
    map: {
      backgroundImage: 'image1'
    }
  },
  {
    id: 2,
    name: "Scenario 2",
    description: "Description 2",
    startDate: 2,
    map: {
      backgroundImage: 'image2'
    }
  }
]

export const getScenario = (scenarioId: number): Observable<Scenario | undefined> => {
  const scenario = mockScenarios.find(scn => scn.id === scenarioId);
  return of(scenario);
}