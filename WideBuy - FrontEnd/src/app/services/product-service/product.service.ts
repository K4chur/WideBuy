import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {map, Observable} from "rxjs";
import {ProductCategory} from "../../common/product-category/product-category";
import {Product} from "../../common/product/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  private categoryUrl = environment.baseUrl + '/product-categories'
  private productUrl = environment.baseUrl + '/products'

  fetchProducts(page: number, pageSize: number): Observable<GetProducts> {
    return this.http.get<GetProducts>(this.productUrl + `?page=${page}&size=${pageSize}&sort=name,asc`)
  }

  fetchProductsOfCategory(page: number, pageSize: number, id: number): Observable<GetProducts> {
    return this.http.get<GetProducts>(this.productUrl + `/search/findByCategoryId?id=${id}&page=${page}&size=${pageSize}&sort=name,asc`)
  }

  fetchCategories(): Observable<ProductCategory[]> {
    return this.http.get<GetProductCategories>(this.categoryUrl).pipe(map(response => response._embedded.productCategories));
  }

  fetchProductsBySearchKey(page: number, pageSize: number, searchKey: string): Observable<GetProducts> {
    return this.http.get<GetProducts>(this.productUrl + `/search/findByNameContaining?searchKey=${searchKey}&page=${page}&size=${pageSize}&sort=name,asc`)
  }

  fetchProduct(id: number): Observable<Product>{
    return this.http.get<Product>(this.productUrl+`/${id}`);
  }
}

interface GetProductCategories {
  _embedded: {
    productCategories: ProductCategory[];
  }
}

interface GetProducts {
  _embedded: {
    products: Product[];
  }
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
