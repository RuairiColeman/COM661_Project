import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TitlesComponent} from './titles.component';
import {HomeComponent} from './home.component';
import {WebService} from './web.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ReviewsComponent} from './reviews.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthModule} from '@auth0/auth0-angular';
import {NavComponent} from './nav.component';
import {TitleComponent} from './title.component'
import {MoviesComponent} from './movies.component';
import {SeriesComponent} from './series.component'

var routes: any = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'titles',
    component: TitlesComponent
  },
  {
    path: 'titles/:id',
    component: TitleComponent
  },
  {
    path: 'titles/:id/reviews',
    component: ReviewsComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  },
    {
    path: 'series',
    component: SeriesComponent
  }
];

@NgModule({
  declarations: [
    AppComponent, TitlesComponent, HomeComponent, ReviewsComponent, NavComponent, TitleComponent, MoviesComponent, SeriesComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot(routes), ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-58skmbsmsgsdjvk7.us.auth0.com',
      clientId: 'jQehCJGU8YwrWgOdwr6rxpsAiBP53cqA'
    })
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
