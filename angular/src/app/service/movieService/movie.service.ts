import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse } from '../../model/movieResponse/movie-response';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  top100="http://radhika-movie-service-env.eba-arzcdmy6.us-east-2.elasticbeanstalk.com/movie/getTop100";
  byId = "http://radhika-movie-service-env.eba-arzcdmy6.us-east-2.elasticbeanstalk.com/movie/getMovieById";
  
  constructor(private httpClient: HttpClient) { }

  getTop100() :Observable<any>{
    return this.httpClient.get(`${this.top100}`);

  }
  getByRank(rank:string):Observable<any>{
    return this.httpClient.get(`${this.byId}/${rank}`);

  }
}
