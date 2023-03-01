import { Observable, of } from "rxjs";
import { IScenario } from "../models/scenario";
import { IScenarioListItem } from "../models/scenario-list-item";

export const mockScenarioList: IScenarioListItem[] = [
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

export const mockScenarios: IScenario[] = [
  {
    id: 1,
    name: "Scenario 1",
    description: "Description 1",
    startDate: 1,
    mapData: {
      backgroundImage: 'image1',
      startingPosition: { x: 100, y: 100 }
    }
  },
  {
    id: 2,
    name: "Scenario 2",
    description: "Description 2",
    startDate: 2,
    mapData: {
      backgroundImage: 'image2',
      startingPosition: { x: 200, y: 200 }
    }
  }
]

export const getScenario = (scenarioId: number): Observable<IScenario | undefined> => {
  const scenario = mockScenarios.find(scn => scn.id === scenarioId);
  return of(scenario);
}