export class Movie {
    constructor(
      public readonly id: string,
      public title: string,
      public year: number,
      public directorId: string,
    ) {}
}
  