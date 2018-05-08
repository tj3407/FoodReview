import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-movie-reviews',
  templateUrl: './movie-reviews.component.html',
  styleUrls: ['./movie-reviews.component.css']
})
export class MovieReviewsComponent implements OnInit {
  id: number;
  @Input() movie: Movie;
  // movie: Movie;

  path: string[] = ['data'];
  order = 1; // 1 asc, -1 desc;

  errorMessage: string;
  constructor(private movieService: MovieService, private _route: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.paramMap.subscribe( params => {
    //   this.id = parseInt(params.get('id'), 10);
    // });
    // this.movieService.getMovie(this.id)
    // .subscribe(mov => this.movie = mov);

    this.route.paramMap
    .switchMap(params => this.movieService.getMovie(params.get('id')))
    .subscribe(
      movie => {
        console.log('got movie', movie);
        this.movie = movie;
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

  onDelete(id: string) {
    console.log('delete movie', id);
    this.movieService.deleteMovie(id).subscribe(returnedMovie => {
      console.log(returnedMovie);
      this._route.navigateByUrl('/');
    });
  }

  deleteReview(reviewId: string, movieId: string) {
    console.log('delete review', reviewId);
    this.movieService.deleteReview(reviewId, movieId).subscribe(returnedMovie => {
      this.movie = returnedMovie;
    });

  }

  sortTable(prop: string) {
    this.path = prop.split('.');
    this.order = this.order * (-1); // change order
    return false; // do not reload
  }
}
