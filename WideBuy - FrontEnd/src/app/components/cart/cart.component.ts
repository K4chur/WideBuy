import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart-service/cart.service";
import {OrderItem} from "../../common/order-item/order-item";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartItems: OrderItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  constructor(private cartService: CartService) {
  }

  ngOnInit() {

    this.cartItems = this.cartService.cartItems;
    this.cartService.cartAdjusted.subscribe(
      response => {
        this.cartItems = response;
      }
    )
    this.cartService.totalPrice.subscribe(
      response=> {
        this.totalPrice = response
      }
    )
    this.cartService.totalQuantity.subscribe(
      response=> {
        this.totalQuantity = response
      }
    )
  }


  addAnother(cartItem: OrderItem) {
    this.cartService.addCartItem(cartItem);
  }

  removeAnother(cartItem: OrderItem) {
    this.cartService.decrementQuantity(cartItem);
  }
}
