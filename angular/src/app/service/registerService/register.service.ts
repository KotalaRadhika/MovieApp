import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/register/user';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl="http://radhika-movie-user-env.eba-guua3guk.us-east-2.elasticbeanstalk.com/movie/register";

  constructor(private httpClient: HttpClient) { }

  registerS(user:User) :Observable<Object>{
    console.log(user);
    return this.httpClient.post(`${this.baseUrl}`,user);

  }
}
