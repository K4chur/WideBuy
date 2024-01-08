export class Product {
  constructor(public id: number,
              public name: string,
              public description: string,
              public unitPrice: number,
              public imageUrl: string,
              public dateCreated: Date,
              public lastUpdated: Date,
              public category_id: number) {
  }
}
