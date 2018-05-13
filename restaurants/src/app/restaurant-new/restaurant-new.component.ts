import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-new',
  templateUrl: './restaurant-new.component.html',
  styleUrls: ['./restaurant-new.component.css']
})
export class RestaurantNewComponent implements OnInit {
  newRestaurant: Restaurant = new Restaurant();

  constructor(private restaurantService: RestaurantService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    const { value, valid } = form;
    console.log('submitting form ', form.value);
    console.log(this.newRestaurant);
    this.restaurantService.createRestaurant(this.newRestaurant).subscribe(restaurant => {
      this.router.navigateByUrl('/');
      this.newRestaurant = new Restaurant();
      form.reset();
    });
  }

  onCancel() {
    this.router.navigateByUrl('/');
  }

}
