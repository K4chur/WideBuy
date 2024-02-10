import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product/product";
import {ProductService} from "../../services/product-service/product.service";
import {Brand} from "../../common/brand/brand";
import {ProductCategory} from "../../common/product-category/product-category";
import {ActivatedRoute} from "@angular/router";
import {OrderItem} from "../../common/order-item/order-item";
import {LikedItemsService} from "../../services/likedItems-service/liked-items.service";
import {CartService} from "../../services/cart-service/cart.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-wider-search',
  templateUrl: './wider-search.component.html',
  styleUrls: ['./wider-search.component.css']
})
export class WiderSearchComponent implements OnInit {

  form!: FormGroup;

  page: number = 1;
  pageSize: number = 6;
  totalElements: number = 1;
  maxSize: number = 5;

  products: Product[] = [];
  brands: Brand[] = [];
  categories: ProductCategory[] = [];

  selectedBrands: Brand[] = [];
  selectedCategories: ProductCategory[] = [];

  searchTerm: string = "";

  minValue: number = 100;
  maxValue: number = 1100;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private likedItemsService: LikedItemsService,
              private cartService: CartService) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
        this.searchTerm = params['searchTerm'];
        console.log(this.searchTerm)
        this.productService.fetchProductsBySearchKey(this.page,this.pageSize,this.searchTerm).subscribe(
          data => {
            this.products = data._embedded.products;
            this.page = data.page.number + 1;
            this.totalElements = data.page.totalElements;
          }
        )
    });
    this.route.paramMap.subscribe(
      () => {
        this.page = 1;
        this.pageSize = 6;
        this.totalElements = 1;
        this.getProducts();
      }
    )
    this.productService.fetchBrands().subscribe(data => {
      this.brands = data;
    })
    this.productService.fetchCategories().subscribe(data => {
      this.categories = data;
    })
    this.form = new FormGroup({
      searchTerm: new FormControl(this.searchTerm),
      categories: new FormControl([]),
      brands: new FormControl([]),
      minPrice: new FormControl(this.minValue),
      maxPrice: new FormControl(this.maxValue),
    })
  }

  getProducts() {
    const filters = this.form.value;
    this.productService.searchProducts(filters,this.page,this.pageSize).subscribe(
      (data) => {
        console.log(data)
        this.products = data._embedded.products;
        this.page = data.page.number + 1;
        this.totalElements = data.page.totalElements;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updatePageSize(value: string) {
    this.pageSize = +value;
    this.getProducts();
  }

  addToCart(product: Product) {
    let cartItem: OrderItem = new OrderItem(product.id, product.name, product.imageUrl, product.unitPrice);
    this.cartService.addCartItem(cartItem);
  }

  addToLikedItems(product: Product) {
    this.likedItemsService.addToLikedItems(product)
  }

  removeFromLikedItems(product: Product) {
    this.likedItemsService.removeFromLikedItems(product)
  }

  isLikedItem(product: Product): boolean {
    return this.likedItemsService.isLikedItem(product)
  }

  getFilledStars(rating: number): number[] {
    return Array.from({length: Math.round(rating)}, (_, index) => index + 1);
  }

  getEmptyStars(rating: number): number[] {
    return Array.from({length: 5 - Math.round(rating)}, (_, index) => index + 1);
  }

  updateCategories(index: number, event: any) {
    if (event.target.checked) {
      // If the checkbox is checked, add the category ID to the selectedCategories array
      this.selectedCategories.push(this.categories[index]);
    } else {
      // If the checkbox is unchecked, remove the category ID from the selectedCategories array
      const existingIndex = this.selectedCategories.findIndex(cat => cat.id === this.categories[index].id);
      if (existingIndex !== -1) {
        this.selectedCategories.splice(existingIndex, 1);
      }
    }
  }

  updateBrands(index: number, event: any) {
    if (event.target.checked) {
      // If the checkbox is checked, add the brand ID to the selectedBrands array
      this.selectedBrands.push(this.brands[index]);
    } else {
      // If the checkbox is unchecked, remove the brand ID from the selectedBrands array
      const existingIndex = this.selectedBrands.findIndex(brand => brand.id === this.brands[index].id);
      if (existingIndex !== -1) {
        this.selectedBrands.splice(existingIndex, 1);
      }
    }
  }

  onSubmit() {
    this.form.get('categories')?.setValue(this.selectedCategories.map(response => response.id))
    this.form.get('brands')?.setValue(this.selectedBrands.map(response => response.id))
    console.log(this.form.value)
    this.getProducts()
  }
}
