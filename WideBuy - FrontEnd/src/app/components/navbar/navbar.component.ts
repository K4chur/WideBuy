import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product-service/product.service";
import {ProductCategory} from "../../common/product-category/product-category";
import {Router} from "@angular/router";
import {CartService} from "../../services/cart-service/cart.service";
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  categories: ProductCategory[] = [];
  cartLength: number = 0;
  authenticated: boolean = false;
  constructor(private productService: ProductService,
              private router: Router,
              private cartService: CartService,
              private authService: AuthService) {
  }

  ngOnInit() {
    if(window.sessionStorage.getItem('app.token')){
      console.log("hey")
      this.authService.authSubject.next(true)
    }
    this.authService.authSubject.subscribe(
      data => {
        this.authenticated = data;
      }
    )
    this.productService.fetchCategories().subscribe(
      data => {
        this.categories = data;
      }
    )
    this.cartService.totalQuantity.subscribe(
      response => {
        this.cartLength = response
      }
    )
  }

  onSearch(value: string) {
    this.router.navigateByUrl(`/search/${value}`)
  }

  logout() {
    window.sessionStorage.clear();
    this.authService.authSubject.next(false);
  }

  protected readonly sessionStorage = sessionStorage;
}
