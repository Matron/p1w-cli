export interface Scenario {
  id: number,
  name: string,
  description: string,
  startDate: number,
  map: {
    backgroundImage: string
  }
}