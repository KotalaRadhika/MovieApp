import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { MovieResponse } from '../../model/movieResponse/movie-response';
import { SectionComponent } from '../../section/section.component';
import { MovieService } from '../../service/movieService/movie.service';
import { WislistService } from '../../service/wishlistService/wislist.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarLogoutComponent } from '../navbar-logout/navbar-logout.component';
import { NavbarComponent } from '../navbar/navbar.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-topmovies',
  standalone: true,
  imports: [DashboardComponent,NavbarLogoutComponent,NavbarComponent,SectionComponent,FooterComponent,RouterModule,RouterLink,CommonModule,MatCardModule],
  templateUrl: './topmovies.component.html',
  styleUrl: './topmovies.component.css'
})
export class TopmoviesComponent implements OnInit {
  content!: MovieResponse[];
  constructor(private movieService:MovieService, private wishlistService:WislistService,private router:Router){}
  ngOnInit(){
    
      this.movieService.getTop100().subscribe(
        data => {
          this.content = data;
        },
        error =>{
          console.error('Error loading top 100 movies : ', error);
        }
        );
      
  }

  
  // getall(){
  //   this.movieService.getTop100().subscribe(
  //     data => {
  //       this.content = data;
  //     });
  //   }
    
  addToWishlist(movie:MovieResponse){
    let loggedIn = sessionStorage.getItem("loginStatus");
    if(loggedIn=='true'){
      console.log("addTowishlist ",movie.id);
      this.wishlistService.add(movie.id).subscribe(
        (data) => {
          console.log("movie added to wislist ",data);
          Swal.fire({   
            title: "Yay!!",     
            text: "Added to watchlist",     
            icon: "success"    
          }); 
        },
        error => {
          console.log("error from service ",error);
          // alert("Sorry..registration failed")
          Swal.fire({
                 
            text: "Already added to wishlist",     
            icon: "error" 
          });
        });
    }
    else{
      Swal.fire({   
        title: "Sorry!!",     
        text: "Please login"
      }); 
      this.router.navigate(['/login'])
    }   
  }
}
