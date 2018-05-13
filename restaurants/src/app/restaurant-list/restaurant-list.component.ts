import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  constructor(private restaurantService: RestaurantService, private router: Router) { }

  ngOnInit() {
    this.restaurantService.restaurants.subscribe( restaurants => {
      this.restaurants = restaurants;
    });
    this.restaurantService.getRestaurants();
  }

  onCreate() {
    this.router.navigateByUrl('/new');
  }

  onDelete(id) {
    console.log('delete restaurant', id);
    this.restaurantService.deleteRestaurant(id).subscribe(returnedRestaurant => {
      console.log(returnedRestaurant);
      this.restaurantService.getRestaurants();
    });
  }

}
