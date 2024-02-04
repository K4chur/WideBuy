import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product/product";
import {ProductService} from "../../services/product-service/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../services/cart-service/cart.service";
import {OrderItem} from "../../common/order-item/order-item";
import {LikedItemsService} from "../../services/likedItems-service/liked-items.service";
import {ReviewSend} from "../../common/reviewSend/reviewSend";
import {ProductDetailsService} from "../../services/product-details-service/product-details.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Review} from "../../common/review/review";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product!: Product;
  reviews: Review[] = [];
  form!: FormGroup;
  username: string = "";
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService,
              private likedItemsService: LikedItemsService,
              private productDetailsService: ProductDetailsService) {
  }

  ngOnInit() {
    if ( sessionStorage.getItem('app.username') != null){
      this.username = sessionStorage.getItem('app.username')!
    }
    this.form = new FormGroup({
      'username' : new FormControl(this.username, [Validators.required, Validators.minLength(3)]),
      'review' : new FormControl('', [Validators.required, Validators.minLength(10)]),
      'rating' : new FormControl<number|null>(null, [Validators.required])
      }
    )
    this.productService.fetchProduct(+this.route.snapshot.paramMap.get('id')!).subscribe(
      data => {
        this.product = data
        console.log(this.product)
        this.productDetailsService.fetchReviews(this.product.id).subscribe(data => {
          this.reviews = data;
          console.log(this.reviews)
        })
      })
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

  onSubmit() {
    this.productDetailsService.addReview(new ReviewSend(this.form.get('username')?.value,this.form.get('rating')?.value,this.form.get('review')?.value,this.product.id)).subscribe(response => console.log(response))
    this.form.reset();
  }

  getFilledStars(rating: number): number[] {
    return Array.from({ length: Math.round(rating) }, (_, index) => index + 1);
  }

  getEmptyStars(rating: number): number[] {
    return Array.from({ length: 5 - Math.round(rating) }, (_, index) => index + 1);
  }
}
