import {Component} from '@angular/core';
import {WebService} from './web.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'titles',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent {
  reviewForm: any;
  title_list: any = [];
  reviews: any = [];

  onSubmit() {
    this.webService.postReview(this.reviewForm.value).subscribe((response: any) => {
      this.reviewForm.reset();
      this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
    });
  }

  isInvalid(control: any) {
    return this.reviewForm.controls[control].invalid && this.reviewForm.controls[control].touched;
  }

  isUntouched() {
    return this.reviewForm.controls.name.pristine || this.reviewForm.controls.text.pristine;
  }

  isIncomplete() {
    return this.isInvalid('name') || this.isInvalid('text') || this.isUntouched();
  }

  constructor(
    public webService: WebService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthService) {}

  ngOnInit() {
    this.title_list = this.webService.getTitle(this.route.snapshot.params['id']);
    this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
    this.reviewForm = this.formBuilder.group({
      name: ['', Validators.required],
      text: ['', Validators.required],
      stars: 5
    });
  }
}
