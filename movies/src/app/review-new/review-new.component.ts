import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Review } from '../review';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-new',
  templateUrl: './review-new.component.html',
  styleUrls: ['./review-new.component.css']
})
export class ReviewNewComponent implements OnInit {
  newReview: Review = new Review();
  id: string;
  movie: Movie;
  constructor(private movieService: MovieService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe( (params) => {
      this.id = params.get('id');
    });
    console.log(this.id);
    this.movieService.getMovie(this.id).subscribe( movie => {
      this.movie = movie;
    });
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    const { value, valid } = form;
    this.movieService.addReview(this.newReview, this.id).subscribe( review => {
      console.log(this.newReview);
      this.router.navigateByUrl(`/movies/${this.id}`);
      this.newReview = new Review();
      form.reset();
    });
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl(`/movies/${this.id}`);
  }

}
