import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MovieResponse } from '../../model/movieResponse/movie-response';
import { WislistService } from '../../service/wishlistService/wislist.service';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ CommonModule, FooterComponent, NavbarComponent, MatCardModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  content: MovieResponse[] = [];
  myButton: any;
  wishListItems: any[] = [];

  constructor(private wishlistService: WislistService, private router: Router, private renderer: Renderer2, private cdRef: ChangeDetectorRef) { }
  ngOnInit() {
    this.getall();
  }

  getall() {
    this.wishlistService.getAllWishlist().subscribe({
      next: (data: any) => {
        if (data && data.length > 0) {
          this.content = data;
          //manually trigger change detection
          this.cdRef.detectChanges();
        }
        else {
          console.log("failed to find your favourites is failed");
        }
      },
      error: (err: any) => {
        //this.errorMessage = err.message;       
        Swal.fire({
          title: 'No movies in your watclist!',
          text: 'Do you want to add movies to your waltchlist?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/topmovies']);
          } else {
            this.router.navigate(['/home']);
          }
        });
      }
    })
  }

  deleteFromWishlist(id: string) {
    console.log("deleteFromWIshlist ", id);
    this.wishlistService.delete(id).subscribe(
      () => {
        console.log("movie deleted from wislist ", id);
        Swal.fire({
          title: "Yay!!",
          text: "Removed from wishlist",
          icon: "success"
        }).then(() => {
          //remove the deleted item from content array
          //this.content = this.content.filter(movie => movie.id !== id);
          //create a new array reference to force angular change detection
          //this.content = [...this.content];
          //manually trigger change detection
          //this.cdRef.detectChanges();
          window.location.reload();
        });
      },
      error => {
        Swal.fire({
          title: "Yay!!",
          text: "Removed from watchlist",
          icon: "success"
        });
      }
    );

  }

}
