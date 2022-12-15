import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Validators} from "@angular/forms";

@Injectable()
export class WebService {
  title_list: any;
  private titleID: any;
  private reviewID: any;
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

  getReview(r_id: any) {
    return this.http.get('http://localhost:5000/api/v1.0/titles/' + this.titleID + '/reviews/' + r_id);
  }

  postReview(review: any) {
    let formData = new FormData();
    formData.append("name", review.name);
    formData.append("text", review.text);
    formData.append("stars", review.stars);

    let today = new Date();
    let todayDate = today.getFullYear() + "-" +
      today.getMonth() + "-" +
      today.getDate();
    formData.append("date", todayDate);

    return this.http.post('http://localhost:5000/api/v1.0/titles/' + this.titleID + '/reviews', formData);
  }

  addTitle(title: any) {
    let formData = this.formData(title);
    return this.http.post('http://localhost:5000/api/v1.0/titles', formData);
  }

  updateTitle(title: any) {
    let formData = this.formData(title);

    return this.http.put('http://localhost:5000/api/v1.0/titles/'+ this.titleID, formData);
  }

  private formData(title: any) {
    let formData = new FormData();
    formData.append("title", title.title);
    formData.append("type", title.type);
    formData.append("listed_in", title.listed_in);
    formData.append("description", title.description);
    formData.append("rating", title.rating);
    formData.append("director", title.director);
    formData.append("duration", title.duration);
    formData.append("cast", title.cast);
    formData.append("release_year", title.release_year);
    formData.append("image", title.image);
    return formData;
  }

  deleteTitle(id: any) {
    this.titleID = id;
    return this.http.delete('http://localhost:5000/api/v1.0/titles/' + id)
  }

  deleteReview(r_id: any) {
    this.reviewID = r_id;
    return this.http.delete('http://localhost:5000/api/v1.0/titles/' + this.titleID + '/reviews/' + r_id)
  }
}
