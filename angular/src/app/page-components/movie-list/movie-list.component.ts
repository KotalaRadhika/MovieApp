import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MovieService } from '../../service/movieService/movie.service';
import { MovieResponse } from '../../model/movieResponse/movie-response';
import { WislistService } from '../../service/wishlistService/wislist.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { FooterComponent } from '../footer/footer.component';
import { SectionComponent } from '../../section/section.component';
import { NavbarLogoutComponent } from '../navbar-logout/navbar-logout.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [DashboardComponent,NavbarComponent,RouterLink,RouterModule,NavbarLogoutComponent,SectionComponent,FooterComponent,CommonModule,FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {

  movieById!: MovieResponse;
  rankInput:string='';
  constructor(private movieService:MovieService, private wishlistService:WislistService,private router:Router){

  }

 
  getById(){
    console.log("search ",this.rankInput);
    this.movieService.getByRank(this.rankInput).subscribe({
      next: (data) => {
        this.movieById = data;
        console.log("movie details ",this.movieById);
      },
      error: (error) => {
        console.log(error.error);
        Swal.fire({ 

          title: "Sorry!"+error.error.Message, 
  
          text: "please select from top1 to top100"
  
        });
      }}
    );
  }

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
