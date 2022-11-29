import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class WebService {
  title_list: any;
  private titleID: any;

  constructor(private http: HttpClient) {
  }

  getTitles(page: number) {
    return this.http.get('http://localhost:5000/api/v1.0/titles?pn=' + page);
  }

  getTitle(id: any) {
    this.titleID = id;
    return this.http.get('http://localhost:5000/api/v1.0/titles/' + id);
  }

  getReviews(id: any) {
    return this.http.get('http://localhost:5000/api/v1.0/titles/' + id + '/reviews');
  }

  postReview(review: any) {
    let postData = new FormData();
    postData.append("name", review.name);
    postData.append("text", review.text);
    postData.append("stars", review.stars);

    return this.http.post('http://localhost:5000/api/v1.0/titles/' + this.titleID + '/reviews', postData);
  }
}
