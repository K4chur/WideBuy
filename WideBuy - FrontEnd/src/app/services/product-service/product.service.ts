import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {map, Observable} from "rxjs";
import {ProductCategory} from "../../common/product-category/product-category";
import {Product} from "../../common/product/product";
import {Brand} from "../../common/brand/brand";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  private categoryUrl = environment.wideBuyUrl + '/product-categories'
  private brandUrl = environment.wideBuyUrl + '/brands'
  private productUrl = environment.wideBuyUrl + '/products'

  fetchProducts(page: number, pageSize: number): Observable<GetProducts> {
    return this.http.get<GetProducts>(this.productUrl + `?page=${page}&size=${pageSize}&sort=name,asc`)
  }

  fetchProductsOfCategory(page: number, pageSize: number, id: number): Observable<GetProducts> {
    return this.http.get<GetProducts>(this.productUrl + `/search/findByCategoryId?id=${id}&page=${page}&size=${pageSize}&sort=name,asc`)
  }

  fetchProductsOfBrand(page: number, pageSize: number, id: number) {
    return this.http.get<GetProducts>(this.productUrl + `/search/findByBrandId?id=${id}&page=${page}&size=${pageSize}&sort=name,asc`)
  }

  fetchCategories(): Observable<ProductCategory[]> {
    return this.http.get<GetProductCategories>(this.categoryUrl).pipe(map(response => response._embedded.productCategories));
  }

  fetchBrands(): Observable<Brand[]> {
    return this.http.get<GetProductBrands>(this.brandUrl).pipe(map(response => response._embedded.brands));
  }

  fetchProductsBySearchKey(page: number, pageSize: number, searchKey: string): Observable<GetProducts> {
    return this.http.get<GetProducts>(this.productUrl + `/search/findByNameContaining?searchKey=${searchKey}&page=${page}&size=${pageSize}&sort=name,asc`)
  }

  fetchProduct(id: number): Observable<Product>{
    return this.http.get<Product>(this.productUrl+`/${id}`);
  }

  searchProducts(filters: any, page: number, pageSize: number): Observable<GetProducts> {
    // Convert filter values to strings
    const name = filters.searchTerm || null;
    const catIds = filters.categories.length != 0 ? filters.categories : null;
    const brandIds = filters.brands.length != 0 ? filters.brands : null;
    const minPrice = filters.minPrice || null;
    const maxPrice = filters.maxPrice || null;

    // Construct HTTP params
    let params = new HttpParams();
    if(name) params = params.append('name', name);
    if (catIds) params = params.append('catIds', catIds.join(','));
    if (brandIds) params = params.append('brandIds', brandIds.join(','));
    if (minPrice) params = params.append('minPrice', minPrice.toString());
    if (maxPrice) params = params.append('maxPrice', maxPrice.toString());

    // Make the GET request
    return this.http.get<GetProducts>(`${this.productUrl}/search/findProductsByFilters?page=${page}&size=${pageSize}`, { params });
  }

}

interface GetProductCategories {
  _embedded: {
    productCategories: ProductCategory[];
  }
}
interface GetProductBrands {
  _embedded: {
    brands: Brand[];
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
