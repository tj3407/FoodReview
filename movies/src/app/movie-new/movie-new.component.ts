import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-movie-new',
  templateUrl: './movie-new.component.html',
  styleUrls: ['./movie-new.component.css']
})
export class MovieNewComponent implements OnInit {
  newMovie: Movie = new Movie();

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit() {
    // console.log(this.newMovie);
  }

  // onSubmit(movie: Movie) {
  //   this.movieService.createMovie(this.newMovie);
  //   this.newMovie = new Movie();
  //   this.router.navigateByUrl('/');
  // }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    const { value, valid } = form;
    console.log('submitting form ', form.value);
    console.log(this.newMovie);
    this.movieService.createMovie(this.newMovie).subscribe(movie => {
      // this.createBook.emit(book);
      this.router.navigateByUrl('/');
      this.newMovie = new Movie();
      form.reset();
    });
  }

  onCancel() {
    this.router.navigateByUrl('/');
  }
}
