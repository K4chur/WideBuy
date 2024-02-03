import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product} from "../../common/product/product";
import {ProductService} from "../../services/product-service/product.service";
import {ActivatedRoute} from "@angular/router";
import {OrderItem} from "../../common/order-item/order-item";
import {CartService} from "../../services/cart-service/cart.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  page: number = 1;
  pageSize: number = 6;
  totalElements: number = 1;
  maxSize: number = 5;

  products: Product[] = [];

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      () => {
        this.page = 1;
        this.pageSize = 6;
        this.totalElements = 1;
        this.getProducts();
      }
    )
  }

  getProducts() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.productService.fetchProductsOfCategory(this.page - 1, this.pageSize, +this.route.snapshot.paramMap.get('id')!).subscribe(
        data => {
          this.products = data._embedded.products;
          this.page = data.page.number + 1;
          this.totalElements = data.page.totalElements;
        }
      )
    } else if (this.route.snapshot.paramMap.has('searchKey')) {
      this.productService.fetchProductsBySearchKey(this.page - 1, this.pageSize, this.route.snapshot.paramMap.get('searchKey')!).subscribe(
        data => {
          this.products = data._embedded.products;
          this.page = data.page.number + 1;
          this.totalElements = data.page.totalElements;
        }
      )
    } else {
      this.productService.fetchProducts(this.page - 1, this.pageSize).subscribe(
        data => {
          this.products = data._embedded.products;
          this.page = data.page.number + 1;
          this.totalElements = data.page.totalElements;
        }
      )
    }
  }

  updatePageSize(value: string) {
    this.pageSize = +value;
    this.getProducts();
  }

  addToCart(product: Product) {
    let cartItem: OrderItem = new OrderItem(product.id, product.name, product.imageUrl, product.unitPrice);
    this.cartService.addCartItem(cartItem);
  }
}
