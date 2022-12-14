import {Component} from '@angular/core';
import {WebService} from './web.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.css']
})

export class TitlesComponent {
  title_list: any = [];
  page: number = 1;

  reviews: any = []
  constructor(public webService: WebService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (sessionStorage['page'])
    {
      this.page = Number(sessionStorage['page']);
    }
    this.title_list = this.webService.getTitles(this.page);
    this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
  }

  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      sessionStorage['page'] = this.page;
      this.title_list = this.webService.getTitles(this.page);
    }
  }

  nextPage() {
    this.page = this.page + 1;
    sessionStorage['page'] = this.page;
    this.title_list = this.webService.getTitles(this.page);
  }

}
