import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class WebService {
  title_list: any;
  private titleID: any;
  private genreID: any;

  constructor(private http: HttpClient) {
  }

  getTitles(page: number) {
    return this.http.get('http://localhost:5000/api/v1.0/titles?pn=' + page);
  }
  getMovies(page: number) {
    return this.http.get('http://localhost:5000/api/v1.0/movies?pn=' + page);
  }
  getSeries(page: number) {
    return this.http.get('http://localhost:5000/api/v1.0/series?pn=' + page);
  }

  getGenre(genre: any) {
    this.genreID = genre
    return this.http.get('http://localhost:5000/api/v1.0/titles/genre/' + genre);
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

     let today = new Date();
 let todayDate = today.getFullYear() + "-" +
 today.getMonth() + "-" +
today.getDate();
 postData.append("date", todayDate);

    return this.http.post('http://localhost:5000/api/v1.0/titles/' + this.titleID + '/reviews', postData);
  }
}
