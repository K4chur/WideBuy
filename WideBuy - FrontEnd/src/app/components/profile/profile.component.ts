import { Component } from '@angular/core';
import {Order} from "../../common/order/order";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    orders: Order[] = []
    protected readonly sessionStorage = sessionStorage;
}
