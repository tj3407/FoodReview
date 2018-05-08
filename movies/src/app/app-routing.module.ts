import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieNewComponent } from './movie-new/movie-new.component';
import { MovieReviewsComponent } from './movie-reviews/movie-reviews.component';
import { ReviewNewComponent } from './review-new/review-new.component';

const routes: Routes = [
  {
    path: 'movies',
    children: [
      { path: '', component: MovieListComponent},
      { path: 'new', component: MovieNewComponent},
      { path: ':id', component: MovieReviewsComponent},
      { path: 'review/:id', component: ReviewNewComponent}
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/movies'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
