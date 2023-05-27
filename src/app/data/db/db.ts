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
  },
  {
    id: 3,
    name: "Misiones Jesuitas",
    description: "Las misiones jesuitas fueron una empresa misionera en América Latina durante los siglos XVI y XVII. Su objetivo era evangelizar y enseñar habilidades prácticas a las poblaciones indígenas. Aunque estuvieron vinculadas a aspectos negativos, también jugaron un papel importante en la protección de los indígenas de la explotación colonial y en la preservación de su cultura. En resumen, las misiones jesuitas dejaron un legado duradero en la historia y la cultura de América Latina."
  }
]

export const mockScenarios: IScenario[] = [
  {
    id: 1,
    name: "Anglo Saxons",
    description: "Description 1",
    startDate: 700,
    mapData: {
      backgroundImage: 'assets/images/back-as-700.jpg',
      startingPosition: { x: 0, y: 0 }
    },
    events: [
      {
        id: 1,
        name: 'H&H',
        startDate: -1,
        endDate: 71000,
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
        startDate: -1,
        endDate: 71000,
        mapObjects: [
          {
            name: 'Artur start',
            position: new Vector2d(200, 200)
          }
        ]
      }
    ],
    source: 'Beade'
  },
  {
    id: 2,
    name: "Franks",
    description: "Description 2",
    startDate: 2,
    mapData: {
      backgroundImage: 'assets/images/Frankish_Empiren.png',
      startingPosition: { x: 100, y: 0 }
    },
    events: [],
    source: 'Grégoire de Tours'
  },
  {
    id: 3,
    name: "Las Misiones Jesuitas",
    description: "Las misiones jesuitas fueron una empresa misionera en América Latina durante los siglos XVI y XVII. Su objetivo era evangelizar y enseñar habilidades prácticas a las poblaciones indígenas. Aunque estuvieron vinculadas a aspectos negativos, también jugaron un papel importante en la protección de los indígenas de la explotación colonial y en la preservación de su cultura. En resumen, las misiones jesuitas dejaron un legado duradero en la historia y la cultura de América Latina.",
    startDate: 1609,
    mapData: {
      backgroundImage: 'assets/images/misiones.png',
      startingPosition: { x: 0, y: 0 }
    },
    events: [],
    source: ''
  }
]

export const getScenario = (scenarioId: number): Observable<IScenario | undefined> => {
  const scenario = mockScenarios.find(scn => scn.id === scenarioId);
  return of(scenario);
}