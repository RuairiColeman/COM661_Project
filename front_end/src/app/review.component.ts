import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {WebService} from "./web.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'titles',
  templateUrl: './review.component.html'
})

export class ReviewComponent {

  constructor(
    public webService: WebService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthService) {
  }

  reviewForm: any;
  title_list: any = [];
  reviews: any = [];

  ngOnInit() {
    this.title_list = this.webService.getTitle(this.route.snapshot.params['id']);
    this.reviews = this.webService.getReview(this.route.snapshot.params['r_id']);
    this.reviewForm = this.formBuilder.group({
      name: ['', Validators.required],
      text: ['', Validators.required],
      stars: 5
    });
  }

  onSubmit() {
    this.webService.updateReview(this.reviewForm.value).subscribe((response: any) => {
      this.reviewForm.reset();
    });
  }
}
