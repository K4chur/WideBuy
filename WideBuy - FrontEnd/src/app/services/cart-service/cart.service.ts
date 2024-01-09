import {Injectable} from '@angular/core';
import {CartItem} from "../../common/cart-item/cart-item";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  cartAdjusted: Subject<CartItem[]> = new Subject<CartItem[]>;
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



  addCartItem(cartItem: CartItem){
    let existingCartItem = this.cartItems.find(tempItem => tempItem.id === cartItem.id)

    if(existingCartItem === undefined) {
      this.cartItems.push(cartItem)
    } else {
      existingCartItem!.quantity++;
    }
    this.cartAdjusted.next(this.cartItems);

    this.computeTotals()
  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeTotals();
    }
  }

  remove(theCartItem: CartItem) {

    // get index of item in the array
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id );

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
