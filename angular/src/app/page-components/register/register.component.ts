import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { User } from '../../model/register/user';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from '../../service/registerService/register.service';
import Swal from 'sweetalert2';
import { HomeComponent } from '../home/home.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,FooterComponent,ReactiveFormsModule,NavbarComponent,CommonModule, MatFormFieldModule, MatInputModule,HttpClientModule,HomeComponent,RouterLink,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  regForm: FormGroup
  msg: boolean = false;
  emailPattern = "^[a-zA-Z0-9_+&*-]+(?:\\." + "[a-zA-Z0-9_+&*-]+)*@" + "(?:[a-zA-Z0-9-]+\\.)+[a-z" + "A-Z]{2,7}$";
  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) { 
    this.regForm = this.fb.group({
      fullname:this.fb.control('',[Validators.required,Validators.pattern("[A-Za-z ]{1,20}"), Validators.minLength(6), Validators.maxLength(20)]),
      userName: this.fb.control('',[Validators.required,Validators.pattern("[A-Za-z ]{1,20}"), Validators.minLength(3), Validators.maxLength(20)]),
      email: this.fb.control('',[Validators.required, Validators.pattern(this.emailPattern)]),
      password: this.fb.control('', [Validators.required, Validators.pattern("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,12})")]),
      })
  }

  ngOnInit(): void {
    }
   
    onSubmit() {
      console.log(this.regForm.value);
      if (this.regForm.valid) {
        this.registerService.registerS(this.regForm.value).subscribe({
          next: (data) => {
            Swal.fire({ 

              title: "Yay!!", 
      
              text: "Your registration is successful", 
      
              icon: "success" 
      
            }); 
            console.log(data);
            this.login();
          },
      error: (error) => {
        console.log(error.error);
        Swal.fire({ 

          title: "Sorry! "+error.error.Message, 
  
          text: "registration failed!" 
  
        });
        this.router.navigate(['/register']); 
      }
    });
  } else {
    this.msg = true;
    Swal.fire({ 

      title: "Sorry!", 

      text: "Please fill all required fields!" 

    });
  }
}
  resetBtn() {
    this.regForm.reset();
    this.msg = false;
  }
  check(input: string) {
    return(this.regForm.get(input)?.errors?.['required'] && this.regForm.get(input)?.touched) || (this.regForm.get(input)?.errors?.['required'] && this.msg)
  }

  checkLength(input: string) {
    return (this.regForm.get(input)?.errors?.['minlength'] || this.regForm.get(input)?.errors?.['maxlength']);
  }
  login(){
    this.router.navigate(['/login']);
  }
}

