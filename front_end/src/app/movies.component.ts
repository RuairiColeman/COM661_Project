import {Component} from '@angular/core';
import {WebService} from './web.service';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent {
  movie_list: any = [];
  page: number = 1;

  constructor(public webService: WebService, public authService: AuthService ) {
  }

  ngOnInit() {
    if (sessionStorage['page']) {
      this.page = Number(sessionStorage['page']);
    }
    this.movie_list = this.webService.getMovies(this.page);
  }

  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      sessionStorage['page'] = this.page;
      this.movie_list = this.webService.getMovies(this.page);
    }
  }

  nextPage() {
    this.page = this.page + 1;
    sessionStorage['page'] = this.page;
    this.movie_list = this.webService.getMovies(this.page);
  }

  lastPage() {
    this.page = 11;
    sessionStorage['page'] = this.page;
    this.movie_list = this.webService.getMovies(this.page);
  }

  firstPage() {
    this.page = 1;
    sessionStorage['page'] = this.page;
    this.movie_list = this.webService.getMovies(this.page);
  }

  deleteTitle(id: any) {
    this.webService.deleteTitle(id).subscribe(res => {
      this.webService.getTitle((item: { id: any; }) => item.id !== id)
    })
  };
}
