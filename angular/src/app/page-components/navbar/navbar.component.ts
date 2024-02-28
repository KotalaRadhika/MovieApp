import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  loginStatus: String = "false";
 
 username = sessionStorage.getItem("username");
 constructor(){
 }
ngOnInit(){
  console.log(sessionStorage.getItem("loginStatus"))
 if(sessionStorage.getItem("loginStatus")==="true"){
   this.loginStatus="false";
 }else{
   this.loginStatus="false";
 }
}

loggedin(){
  return sessionStorage.getItem('username');
}

onLogout(){
    sessionStorage.setItem("loginStatus","false")
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token")
  }


}
