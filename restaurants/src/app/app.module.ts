import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RestaurantService } from './restaurant.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantNewComponent } from './restaurant-new/restaurant-new.component';
import { RestaurantUpdateComponent } from './restaurant-update/restaurant-update.component';
import { RestaurantShowComponent } from './restaurant-show/restaurant-show.component';
import { RestaurantNewreviewComponent } from './restaurant-newreview/restaurant-newreview.component';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    RestaurantNewComponent,
    RestaurantUpdateComponent,
    RestaurantShowComponent,
    RestaurantNewreviewComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
