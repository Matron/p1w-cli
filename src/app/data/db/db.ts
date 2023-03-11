import { Vector2d } from "@map/models/vector-2d";
import { Observable, of } from "rxjs";
import { IScenario } from "../models/scenario";
import { IScenarioListItem } from "../models/scenario-list-item";

export const mockScenarioList: IScenarioListItem[] = [
  {
    id: 1,
    name: "AS",
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
    name: "AS",
    description: "Description 1",
    startDate: 700,
    mapData: {
      backgroundImage: 'assets/images/back-as-700.jpg',
      startingPosition: { x: 100, y: 100 }
    },
    events: [
      {
        id: 1,
        name: 'H&H',
        startDate: 702,
        endDate: 710,
        mapObjects: [
          {
            name: 'H&H arrive',
            position: new Vector2d(100, 100)
          }
        ]
      },
      {
        id: 2,
        name: 'Artur',
        startDate: 705,
        endDate: 715,
        mapObjects: [
          {
            name: 'Artur start',
            position: new Vector2d(200, 200)
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Scenario 2",
    description: "Description 2",
    startDate: 2,
    mapData: {
      backgroundImage: 'assets/images/Frankish_Empiren.png',
      startingPosition: { x: 200, y: 200 }
    },
    events: []
  }
]

export const getScenario = (scenarioId: number): Observable<IScenario | undefined> => {
  const scenario = mockScenarios.find(scn => scn.id === scenarioId);
  return of(scenario);
}