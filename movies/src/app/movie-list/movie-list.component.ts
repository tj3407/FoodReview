import { Component, OnInit } from '@angular/core';

import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  selectedMovie: Movie;
  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit() {
    this.movieService.movies.subscribe( movies => {
      this.movies = movies;
    });
    this.movieService.getMovies();
  }

  onCreate() {
    this.router.navigateByUrl('/new');
  }

  // selectMovie(movie: Movie): void {
  //   this.selectedMovie = this.selectedMovie === movie ? null : movie;
  // }

}
