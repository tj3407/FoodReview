import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-restaurant-show',
  templateUrl: './restaurant-show.component.html',
  styleUrls: ['./restaurant-show.component.css']
})
export class RestaurantShowComponent implements OnInit {
  id: number;
  @Input() restaurant: Restaurant;
  errorMessage: string;
  path: string[] = ['data'];
  order = 1; // 1 asc, -1 desc;
  constructor(private movieService: RestaurantService, private _route: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
    .switchMap(params => this.movieService.getRestaurant(params.get('id')))
    .subscribe(
      restaurant => {
        console.log('got restaurant', restaurant);
        this.restaurant = restaurant;
      },
      error => {
        console.log('got an error');
        console.log(error);
        this.errorMessage = error.statusText;

        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      }
    );
  }

  sortTable(prop: string) {
    this.path = prop.split('.');
    this.order = this.order * (-1); // change order
    return false; // do not reload
  }

}
