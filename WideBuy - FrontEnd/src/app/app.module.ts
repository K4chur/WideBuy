import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Route, RouterModule} from "@angular/router";
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {ReactiveFormsModule} from "@angular/forms";

const routes: Route[] = [
  {path: 'products', component: ProductListComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'search/:searchKey', component: ProductListComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: '', redirectTo:'/products', pathMatch:'full'},
  {path: '**', redirectTo:'/products'}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
