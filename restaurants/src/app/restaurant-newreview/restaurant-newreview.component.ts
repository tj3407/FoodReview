import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Restaurant } from '../restaurant';
import { Review } from '../review';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-newreview',
  templateUrl: './restaurant-newreview.component.html',
  styleUrls: ['./restaurant-newreview.component.css']
})
export class RestaurantNewreviewComponent implements OnInit {
  newReview: Review = new Review();
  id: string;
  restaurant: Restaurant;
  errorMessage: Error;
  constructor(private restaurantService: RestaurantService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe( (params) => {
      this.id = params.get('id');
    });
    console.log(this.id);
    this.restaurantService.getRestaurant(this.id).subscribe( restaurant => {
      this.restaurant = restaurant;
    });
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    const { value, valid } = form;
    this.restaurantService.addReview(this.newReview, this.id).subscribe( review => {
      console.log(this.newReview);
      this.router.navigateByUrl(`/`);
      this.newReview = new Review();
      form.reset();
    },
    error => {
      this.errorMessage = error;
      console.log(error.json());
    });
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl(`/`);
  }

}
