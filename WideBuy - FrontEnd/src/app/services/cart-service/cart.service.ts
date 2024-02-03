import {Injectable} from '@angular/core';
import {OrderItem} from "../../common/order-item/order-item";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: OrderItem[] = [];
  cartAdjusted: Subject<OrderItem[]> = new Subject<OrderItem[]>;
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  storage: Storage = localStorage;

  constructor() {
    let data = JSON.parse(this.storage.getItem('cartItems')!)
    if(data != null){
      this.cartItems = data;
    }
    this.computeTotals();
    this.cartAdjusted.next(this.cartItems)
  }



  addCartItem(cartItem: OrderItem){
    let existingCartItem = this.cartItems.find(tempItem => tempItem.productId === cartItem.productId)

    if(existingCartItem === undefined) {
      this.cartItems.push(cartItem)
    } else {
      existingCartItem!.quantity++;
    }
    this.cartAdjusted.next(this.cartItems);

    this.computeTotals()
  }

  decrementQuantity(theCartItem: OrderItem) {

    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeTotals();
    }
  }

  remove(theCartItem: OrderItem) {

    // get index of item in the array
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.productId === theCartItem.productId);

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeTotals();
    }
  }

  computeTotals(){
    this.totalQuantity.next(this.cartItems.reduce((sum, current) => sum + current.quantity, 0));
    this.totalPrice.next(this.cartItems.reduce((sum, current) => sum + (current.unitPrice*current.quantity), 0));
    this.persistCartItems()
  }

  persistCartItems(){
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems))
  }

}
