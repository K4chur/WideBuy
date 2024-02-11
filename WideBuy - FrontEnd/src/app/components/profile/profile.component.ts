import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile-service/profile.service";
import {OrderHistory} from "../../common/order-history/order-history";
import {Product} from "../../common/product/product";
import {LikedItemsService} from "../../services/likedItems-service/liked-items.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userChoose: boolean = false;
  orders: OrderHistory[] = [];
  likedItems: Product[] = [];
  protected readonly sessionStorage = sessionStorage;

  constructor(private profileService: ProfileService,
              private likedItemsService: LikedItemsService) {
  }
  ngOnInit() {
    this.profileService.loadOrderHistory().subscribe(data => {
      this.orders = data;
      console.log(this.orders);
    })
    this.likedItemsService.likedItemsSubject.subscribe(data => {
      this.likedItems = data;
    })
  }

  toggleView() {
    this.userChoose = !this.userChoose;
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
    return Array.from({ length: Math.round(rating) }, (_, index) => index + 1);
  }

  getEmptyStars(rating: number): number[] {
    return Array.from({ length: 5 - Math.round(rating) }, (_, index) => index + 1);
  }
}
