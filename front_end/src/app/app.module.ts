import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TitlesComponent} from './titles.component';
import {HomeComponent} from './home.component';
import {WebService} from './web.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {TitleComponent} from './title.component';
import { ReactiveFormsModule } from '@angular/forms';

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
  }
];

@NgModule({
  declarations: [
    AppComponent, TitlesComponent, HomeComponent, TitleComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot(routes), ReactiveFormsModule
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
