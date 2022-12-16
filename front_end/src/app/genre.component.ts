import {Component} from '@angular/core';
import {WebService} from './web.service';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'titles',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})

export class GenreComponent {
  genre_list: any = [];
  page: number = 1;

  constructor(public webService: WebService, private route: ActivatedRoute, public authService: AuthService) {
  }

  ngOnInit() {

    this.genre_list = this.webService.getGenre(this.route.snapshot.params['genre']);
  }

    deleteTitle(id: any) {
      this.webService.deleteTitle(id).subscribe(res => {
        this.webService.getTitle((item: { id: any; }) => item.id !== id)
    })
  };
}
