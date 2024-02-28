import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, NgModule} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginRequest } from '../../model/login/login-request';
import { LoginService } from '../../service/loginService/login.service';
import { ValidateLoginService } from '../../service/loginService/validate-login.service';
import { HomeComponent } from '../home/home.component';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,FooterComponent,NavbarComponent,HomeComponent,CommonModule,HttpClientModule,RouterModule,RouterLink,MatInputModule,MatButtonModule,MatFormFieldModule,MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  result: any
  msg: boolean = false;
  loginForm: FormGroup;
  hide=true;
  
  constructor(private formBuilder:FormBuilder, private loginService:LoginService,
    private validateLogin:ValidateLoginService, private router:Router){
        this.loginForm = this.formBuilder.group({
          username: this.formBuilder.control('', Validators.required),
          password: this.formBuilder.control('', Validators.required)
        })
      sessionStorage.setItem('loginStatus','false')
    }

    
    userRequest:LoginRequest = new LoginRequest();
    ngOnInit(): void{

    }

    loginUser(){
      console.log(this.userRequest);
      this.loginService.doLogin(this.userRequest).subscribe
      (
        data => {
        console.log("data from service ",data);
        sessionStorage.setItem("username",this.userRequest.username);
        sessionStorage.setItem("loginStatus",'true');
        sessionStorage.setItem("token",data.token);
        Swal.fire({
          title: "Yay!!",
          text: "login successful",
          icon: "success"
        });

        this.router.navigate(['/home'])
      },
      error => {
        console.log("error from service ",error.message);
        Swal.fire({
          title: "Sorry!",
          text: "login failed, Please check credentials!"
        });
      })
    }
   

}
