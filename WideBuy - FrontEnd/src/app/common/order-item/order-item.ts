export class OrderItem {
  constructor(public productId: number,
              public name: string,
              public imageUrl: string,
              public unitPrice: number,
              public quantity: number = 1) {
  }
}
