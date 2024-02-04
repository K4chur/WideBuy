export class ReviewSend {

  constructor(public username: string,
              public rating: number,
              public review: string,
              public product_id: number) {
  }
}
