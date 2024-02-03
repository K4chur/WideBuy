import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderHistory} from "../../common/order-history/order-history";
import {environment} from "../../../environments/environment.development";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  orderHistoryUrl = environment.wideBuyUrl+"/orders/search/findByCustomerUsername?username="
  constructor(private http: HttpClient) { }

  loadOrderHistory(){
    return this.http.get<GetOrderHistory>(this.orderHistoryUrl+sessionStorage.getItem('app.username')).pipe(map(response => response._embedded.orders));
  }
}

interface GetOrderHistory{
  _embedded:{
    orders: OrderHistory[]
  }
}
