import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Movie} from './movie';
import { Review } from './review';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MovieService {
  movies: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private _http: Http, private http: HttpClient) { }

  getMovies() {
    this._http.get('/movies').subscribe(
      movies => this.movies.next(movies.json()),
      errorResponse => console.log(errorResponse)
    );
  }

  getMovie(movieID: string): Observable<Movie> {
    return this.http.get<Movie>(`movies/${movieID}`);
  }

  // createMovie(movie: Movie) {
  //   this._http.post('/movies', movie).subscribe(
  //     response => this.getMovies(),
  //     errorResponse => console.log(errorResponse)
  //   );
  // }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>('/movies/new', movie);
  }

  deleteMovie(id: string): Observable<Movie> {
    return this.http.delete<Movie>(`movies/${id}`);
  }

  deleteReview(reviewId: string, movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`/movies/${movieId}/${reviewId}`);
  }

  addReview(review: Review, id: string) {
    return this.http.post<Review>(`/movies/review/${id}`, review);
  }
}
