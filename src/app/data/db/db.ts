import { Vector2d } from "@map/models/vector-2d";
import { Observable, of } from "rxjs";
import { IScenarioData } from "../models/scenario";
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
  },
  {
    id: 4,
    name: "The Balkans",
    description: "1 - The death of Yugoslavia"
  }
]

export const mockScenarios: IScenarioData[] = [
  {
    id: 1,
    name: "Anglo Saxons",
    description: "Description 1",
    startDate: 700,
    mapData: {
      backgroundImage: 'assets/images/back-as-700.jpg',
      startingPosition: { x: 0, y: -100 }
    },
    events: [
      {
        id: 1,
        name: 'H&H',
        startDate: 10,
        endDate: 710,
        layerId: 1,
        mapObjectsData: [
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
        endDate: 730,
        layerId: 1,
        mapObjectsData: [
          {
            name: 'Artur start',
            position: new Vector2d(200, 200)
          }
        ]
      }
    ],
    layers: [
      {
        id: 1,
        name: 'Legendary Events',
        isActive: true,
        mapObjectsData: []
      },
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
    layers: [],
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
    layers: [],
    source: ''
  },
  {
    id: 4,
    name: "The Balkans",
    description: "1 - The death of Yugoslavia",
    startDate: 1980,
    mapData: {
      backgroundImage: 'assets/images/kosovo.jpg',
      startingPosition: { x: 0, y: 0 }
    },
    events: [
      {
        id: 1,
        name: 'Kosovo',
        startDate: -1,
        endDate: 71000,
        layerId: 3,
        mapObjectsData: [
          {
            name: 'Pristina',
            position: new Vector2d(584, 463),
          }
        ]
      },
      {
        id: 2,
        name: 'Vlashnjë',
        startDate: -1,
        endDate: 71000,
        layerId: 1,
        mapObjectsData: [
          {
            name: 'Vlashnjë',
            position: new Vector2d(401, 382),
          }
        ]
      },
      {
        id: 3,
        name: 'Runik',
        startDate: -1,
        endDate: 71000,
        layerId: 1,
        mapObjectsData: [
        {
          name: 'Runik',
          position: new Vector2d(378, 716),
          }
        ]
      },
    ],
    layers: [
      {
        id: 1,
        name: 'Neolithic Period sites',
        isActive: true,
        mapObjectsData: []
      },
      {
        id: 2,
        name: 'Copper Age sites',
        isActive: true,
        mapObjectsData: []
      },
      {
        id: 3,
        name: 'Bronze Age sites',
        isActive: false,
        mapObjectsData: []
      },
      {
        id: 4,
        name: 'Iron Age sites',
        isActive: false,
        mapObjectsData: []
      },
      {
        id: 5,
        name: 'Roman Period sites',
        isActive: true,
        mapObjectsData: []
      },
      {
        id: 6,
        name: 'Medieval sites',
        isActive: false,
        mapObjectsData: []
      }
    ],
    source: ''
  }
]

export const getScenario = (scenarioId: number): Observable<IScenarioData | undefined> => {
  const scenario = mockScenarios.find(scn => scn.id === scenarioId);
  return of(scenario);
}