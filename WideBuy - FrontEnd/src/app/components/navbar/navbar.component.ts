import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product-service/product.service";
import {ProductCategory} from "../../common/product-category/product-category";
import {NavigationExtras, Router} from "@angular/router";
import {CartService} from "../../services/cart-service/cart.service";
import {AuthService} from "../../services/auth-service/auth.service";
import {Brand} from "../../common/brand/brand";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  categories: ProductCategory[] = [];
  brands: Brand[] = [];
  cartLength: number = 0;
  authenticated: boolean = false;
  constructor(private productService: ProductService,
              private router: Router,
              private cartService: CartService,
              private authService: AuthService) {
  }

  ngOnInit() {
    if(window.sessionStorage.getItem('app.token')){
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
    this.productService.fetchBrands().subscribe(
      data => {
        this.brands = data;
      }
    )
    this.cartService.totalQuantity.subscribe(
      response => {
        this.cartLength = response
      }
    )
  }

  onSearch(value: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: { 'searchTerm': value }
    };

    // Navigate to the search route with the specified query parameter
    this.router.navigate(['/search'], navigationExtras);
  }

  logout() {
    window.sessionStorage.clear();
    this.authService.authSubject.next(false);
    this.router.navigateByUrl("/");
  }

  protected readonly sessionStorage = sessionStorage;
}
