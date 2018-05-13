import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantNewComponent } from './restaurant-new/restaurant-new.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantShowComponent } from './restaurant-show/restaurant-show.component';
import { RestaurantUpdateComponent } from './restaurant-update/restaurant-update.component';
import { RestaurantNewreviewComponent } from './restaurant-newreview/restaurant-newreview.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: RestaurantListComponent },
  { path: 'new', component: RestaurantNewComponent },
  { path: 'reviews/:id', component: RestaurantShowComponent },
  { path: 'edit/:id', component: RestaurantUpdateComponent },
  { path: 'write/:id', component: RestaurantNewreviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
