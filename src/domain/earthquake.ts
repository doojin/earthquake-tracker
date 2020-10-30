export class Position {
  // eslint-disable-next-line no-useless-constructor
  constructor (public longitude: number,
               public latitude: number,
               public depth: number) {}
}

export class Earthquake {
  // eslint-disable-next-line no-useless-constructor
  constructor (public id: string,
               public title: string,
               public position: Position,
               public magnitude: number,
               public timestamp: number) {}
}
