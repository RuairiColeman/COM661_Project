import {Component} from '@angular/core';
import {WebService} from './web.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'titles',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})

export class TitleComponent {
  title_list: any = [];
  reviews: any = []
  constructor(public webService: WebService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.title_list = this.webService.getTitle(this.route.snapshot.params['id']);
    this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
  }


}
