import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class WebService {
  title_list: any;

  constructor(private http: HttpClient) {
  }

  getTitles(page: number) {
    return this.http.get('http://localhost:5000/api/v1.0/titles?pn=' + page);
  }

  getTitle(id: any) {
    return this.http.get('http://localhost:5000/api/v1.0/titles/' + id);
  }
}
