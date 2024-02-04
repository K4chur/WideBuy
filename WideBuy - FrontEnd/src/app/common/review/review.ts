export class Review {

  constructor(public id: number,
              public username: string,
              public rating: number,
              public review: string,
              public creationDate: Date,
              public product_id: number) {
  }
}
