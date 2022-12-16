import {Component} from '@angular/core';
import {WebService} from './web.service';
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})

export class SeriesComponent {
  series_list: any = [];
  page: number = 1;

  constructor(public webService: WebService, public authService: AuthService) {
  }

  ngOnInit() {
    if (sessionStorage['page']) {
      this.page = Number(sessionStorage['page']);
    }
    this.series_list = this.webService.getSeries(this.page);
  }

  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      sessionStorage['page'] = this.page;
      this.series_list = this.webService.getSeries(this.page);
    }
  }

  nextPage() {
    this.page = this.page + 1;
    sessionStorage['page'] = this.page;
    this.series_list = this.webService.getSeries(this.page);
  }

  lastPage() {
    this.page = 9;
    sessionStorage['page'] = this.page;
    this.series_list = this.webService.getSeries(this.page);
  }

  firstPage() {
    this.page = 1;
    sessionStorage['page'] = this.page;
    this.series_list = this.webService.getSeries(this.page);
  }

  deleteTitle(id: any) {
    this.webService.deleteTitle(id).subscribe(res => {
      this.webService.getTitle((item: { id: any; }) => item.id !== id)
    })
  };
}
