import {Component} from '@angular/core';
import {WebService} from './web.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'titles',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})

export class GenreComponent {
  genre_list: any = [];
  page: number = 1;

  constructor(public webService: WebService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.genre_list = this.webService.getGenre(this.route.snapshot.params['genre']);
  }
}
