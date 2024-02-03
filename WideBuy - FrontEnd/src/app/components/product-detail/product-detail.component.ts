import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product/product";
import {ProductService} from "../../services/product-service/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../services/cart-service/cart.service";
import {OrderItem} from "../../common/order-item/order-item";
import {LikedItemsService} from "../../services/likedItems-service/liked-items.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product!: Product;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService,
              private likedItemsService: LikedItemsService) {
  }

  ngOnInit() {
    this.productService.fetchProduct(+this.route.snapshot.paramMap.get('id')!).subscribe(
      data => this.product = data
    )
  }

  addToCart() {
    let cartItem: OrderItem = new OrderItem(this.product.id, this.product.name, this.product.imageUrl, this.product.unitPrice);
    this.cartService.addCartItem(cartItem);
  }

  isLikedItem(product: Product) {
    return this.likedItemsService.isLikedItem(product);
  }

  addToLikedItems(product: Product) {
    this.likedItemsService.addToLikedItems(product);
  }

  removeFromLikedItems(product: Product) {
    this.likedItemsService.removeFromLikedItems(product);
  }
}
