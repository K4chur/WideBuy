import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product/product";
import {ProductService} from "../../services/product-service/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product!: Product;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.productService.fetchProduct(+this.route.snapshot.paramMap.get('id')!).subscribe(
      data => this.product = data
    )
  }
}
