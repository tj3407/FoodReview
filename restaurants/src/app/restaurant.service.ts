import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from './restaurant';
import { Review } from './review';

@Injectable()
export class RestaurantService {
  restaurants: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private _http: Http, private http: HttpClient) { }

  getRestaurants() {
    this._http.get('/restaurants').subscribe(
      restaurants => this.restaurants.next(restaurants.json()),
      errorResponse => console.log(errorResponse)
    );
  }

  getRestaurant(restID: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`restaurants/${restID}`);
  }

  createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>('/restaurants/new', restaurant);
  }

  deleteRestaurant(restID: string): Observable<Restaurant> {
    return this.http.delete<Restaurant>(`restaurants/${restID}`);
  }

  updateRestaurant(restaurant: Restaurant, restID: string): Observable<Restaurant> {
    return this.http.put<Restaurant>(`/restaurants/${restID}`, restaurant);
  }

  addReview(review: Review, restID: string) {
    return this.http.post<Review>(`/restaurants/review/${restID}`, review);
  }

}
