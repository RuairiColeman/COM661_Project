import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Validators} from "@angular/forms";

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

  addTitle(title: any) {
    let postData = new FormData();
    postData.append("title", title.title);
    postData.append("type", title.type);
    postData.append("listed_in", title.listed_in);
    postData.append("description", title.description);
    postData.append("rating", title.rating);
    postData.append("director", title.director);
    postData.append("duration", title.duration);
    postData.append("cast", title.cast);
    postData.append("release_year", title.release_year);

    return this.http.post('http://localhost:5000/api/v1.0/titles', postData);
  }

  deleteTitle(id: any) {
    this.titleID = id;
    return this.http.delete('http://localhost:5000/api/v1.0/titles/' + id)
  }
}
