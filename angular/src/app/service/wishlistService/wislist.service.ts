import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WislistService {

  all="http://radhika-movie-wishlist-env.eba-r9fq5rpk.us-east-2.elasticbeanstalk.com/movie/wishlist/all";
  addto="http://radhika-movie-wishlist-env.eba-r9fq5rpk.us-east-2.elasticbeanstalk.com/movie/wishlist/add";
  deleteFrom="http://radhika-movie-wishlist-env.eba-r9fq5rpk.us-east-2.elasticbeanstalk.com/movie/wishlist/delete"
  username = sessionStorage.getItem("username");
  sample:string="top90"

  constructor(private httpClient: HttpClient) {
    
  
   }
  
  add(rank:string):Observable<any>{
    console.log("rank ",rank);
    return this.httpClient.get(`${this.addto}/${this.username}/${rank}`);
  }

  getAllWishlist():Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(`${this.all}/${this.username}`,{ headers });
  }

  
  
  delete(rank:string):Observable<any>{
    return this.httpClient.delete(`${this.deleteFrom}/${this.username}/${rank}`);
  }


 
}


  
