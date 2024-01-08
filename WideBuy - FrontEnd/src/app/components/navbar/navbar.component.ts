import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product-service/product.service";
import {ProductCategory} from "../../common/product-category/product-category";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  categories: ProductCategory[] = [];
  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {
    this.productService.fetchCategories().subscribe(
      data => {
        this.categories = data;
      }
    )
  }

  onSearch(value: string) {
    this.router.navigateByUrl(`/search/${value}`)
  }
}
