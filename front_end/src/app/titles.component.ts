import {Component} from '@angular/core';
import {WebService} from './web.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.css']
})

export class TitlesComponent {
  title_list: any = [];
  page: number = 1;
  titleForm: any;
  reviews: any = []

  constructor(public webService: WebService, private route: ActivatedRoute, private formBuilder: FormBuilder, public authService: AuthService) {
  }

  ngOnInit() {
    if (sessionStorage['page'])
    {
      this.page = Number(sessionStorage['page']);
    }

    this.titleForm = this.formBuilder.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      listed_in: ['', Validators.required],
      description: ['', Validators.required],
      rating: '',
      director:'',
      duration:'',
      cast:'',
      release_year:''
    });

    this.title_list = this.webService.getTitles(this.page);
    this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
  }

    onSubmit() {
      this.webService.addTitle(this.titleForm.value).subscribe((response: any) => {
        this.titleForm.reset();
    });
  }

  isInvalid(control: any) {
    return this.titleForm.controls[control].invalid && this.titleForm.controls[control].touched;
  }

  isUntouched() {
    return this.titleForm.controls.name.pristine || this.titleForm.controls.text.pristine;
  }

  isIncomplete() {
    return this.isInvalid('title') || this.isInvalid('type') || this.isUntouched();
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

    deleteTitle(id: any) {
      this.webService.deleteTitle(id).subscribe(res => {
        this.webService.getTitle((item: { id: any; }) => item.id !== id)
    })
  };

}
