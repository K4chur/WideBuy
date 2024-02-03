import {Component, OnInit} from '@angular/core';
import {Order} from "../../common/order/order";
import {OrderItem} from "../../common/order-item/order-item";
import {ProfileService} from "../../services/profile-service/profile.service";
import {OrderHistory} from "../../common/order-history/order-history";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userChoose: boolean = false;
  orders: OrderHistory[] = [];
  likedItems: OrderItem[] = [];
  protected readonly sessionStorage = sessionStorage;

  constructor(private profileService: ProfileService) {
  }
  ngOnInit() {
    this.profileService.loadOrderHistory().subscribe(data => {
      this.orders = data;
      console.log(this.orders);
    })
  }

  toggleView() {
    this.userChoose = !this.userChoose;
  }
}
