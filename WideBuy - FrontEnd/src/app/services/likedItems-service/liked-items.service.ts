import {Injectable} from '@angular/core';
import {Product} from "../../common/product/product";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LikedItemsService {
  private likedItems: Product[] = [];
  likedItemsSubject: Subject<Product[]> = new BehaviorSubject<Product[]>(this.likedItems);

  constructor() {
    if(JSON.parse(localStorage.getItem('likedItems')!) != null){
      this.likedItems = JSON.parse(localStorage.getItem('likedItems')!);
      this.likedItemsSubject.next(this.likedItems)
    }
  }

  addToLikedItems(product: Product) {
    if(!this.isLikedItem(product)) {
      this.likedItems.push(product);
      localStorage.setItem('likedItems', JSON.stringify(this.likedItems));
      this.likedItemsSubject.next(this.likedItems);
    }
  }

  removeFromLikedItems(product: Product) {
    this.likedItems = this.likedItems.filter(item => item.id !== product.id);
    localStorage.setItem('likedItems', JSON.stringify(this.likedItems));
    this.likedItemsSubject.next(this.likedItems);

  }

  isLikedItem(product: Product): boolean {
    return this.likedItems.some(item => item.id === product.id);
  }

}
