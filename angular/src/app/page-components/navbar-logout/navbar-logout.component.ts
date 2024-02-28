import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-logout',
  standalone: true,
  imports: [RouterLink,RouterModule],
  templateUrl: './navbar-logout.component.html',
  styleUrl: './navbar-logout.component.css'
})
export class NavbarLogoutComponent {

  constructor(private router:Router){}

  getall(){
    this.router.navigate(['/wishlist']);
    }

    logout(){
      sessionStorage.setItem("loginStatus","false")
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("token")
    }
}
