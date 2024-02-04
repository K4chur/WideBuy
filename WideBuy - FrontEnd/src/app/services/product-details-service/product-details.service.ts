import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {ReviewSend} from "../../common/reviewSend/reviewSend";
import {map, Observable} from "rxjs";
import {Review} from "../../common/review/review";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private http: HttpClient) { }

  private fetchReviewsUrl = environment.wideBuyUrl+"/reviews/search/findByProductId?id="
  private addReviewUrl = environment.baseUrl+"/review/add"

  fetchReviews(id: number){
    return this.http.get<GetReviews>(this.fetchReviewsUrl+id).pipe(map(response => response._embedded.reviews))
  }

  addReview(review: ReviewSend): Observable<string> {
    return this.http.post<string>(this.addReviewUrl,review);
  }
}

interface GetReviews{
  _embedded:{
    reviews: Review[];
  }
}
