import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-update',
  templateUrl: './restaurant-update.component.html',
  styleUrls: ['./restaurant-update.component.css']
})
export class RestaurantUpdateComponent implements OnInit {
  id: string;
  restaurant: Restaurant;
  constructor(private restaurantService: RestaurantService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe( params => {
      this.id = params.get('id');
    });
    this.restaurantService.getRestaurant(this.id)
    .subscribe(restaurant => this.restaurant = restaurant);
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    this.restaurantService.updateRestaurant(this.restaurant, this.id)
    .subscribe( () => {
      this.router.navigateByUrl('/');
    });
  }

}
