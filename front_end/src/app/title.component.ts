import {Component} from '@angular/core';
import {WebService} from './web.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '@auth0/auth0-angular';


@Component({
  selector: 'titles',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})

export class TitleComponent {
  title_list: any = [];
  id: any;
  reviews: any = [];

  titleForm: any;
  constructor(public webService: WebService, private route: ActivatedRoute, private formBuilder: FormBuilder, public authService: AuthService) {
  }

  ngOnInit() {
    this.title_list = this.webService.getTitle(this.route.snapshot.params['id']);
    this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
    this.titleForm = this.formBuilder.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      listed_in: ['', Validators.required],
      description: ['', Validators.required],
      rating: this.title_list.rating,
      director: '',
      duration: '',
      cast: '',
      release_year: '',
      image: ''
    });
  }
    onSubmit() {
      this.webService.updateTitle(this.titleForm.value).subscribe((response: any) => {
        this.titleForm.reset();
    });
  }

}
