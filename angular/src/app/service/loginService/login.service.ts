import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '../../model/login/login-request';
import { LoginResponse } from '../../model/login/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token : string  = '' 
  topic : string = '';  
  // private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  // // get isLoggedIn() {
  // //   return this.loggedIn.asObservable(); // {2}
  // // }


  baseUrl="http://radhika-movie-auth-env.eba-jvgmnpjp.us-east-2.elasticbeanstalk.com/movie/login";

  constructor(private httpClient: HttpClient, private router:Router) { }

  doLogin(user:LoginRequest) :Observable<any>{
    return this.httpClient.post(`${this.baseUrl}`,user);

  }

  // authUser(user: any){
  //   let UserArray = [];
  //   if(sessionStorage.getItem('Users')){
  //     UserArray = JSON.parse(sessionStorage.getItem('Users'));
  //   }
  //   return UserArray.find( 
  //     p => p.username === user.username &&
  //           p.password === user.password
  //   );
  // }
  // login(user: LoginRequest){
  //   if (user.username !== '' && user.password !== '' ) { // {3}
  //     this.loggedIn.next(true);
  //     this.router.navigate(['/']);
  //   }
  // }
  // logout() {                            // {4}
  //   this.loggedIn.next(false);
  //   this.router.navigate(['/login']);
  // }
}