import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { MovieResponse } from '../../model/movieResponse/movie-response';
import { FooterComponent } from '../footer/footer.component';
import { SectionComponent } from '../../section/section.component';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FooterComponent,SectionComponent,WishlistComponent,MatFormField,MatDividerModule,MatSidenavModule,MatCommonModule,MatIcon,RouterLink,RouterModule,MatToolbarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  

  constructor(private router:Router){}

  getall(){
    // this.router.navigate(['/wishlist']);
    }

    logout(){
      sessionStorage.setItem("loginStatus","false")
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("token")
    }

}
