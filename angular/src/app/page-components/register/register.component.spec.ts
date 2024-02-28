import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { throwError } from 'rxjs';
import { RegisterService } from '../../service/registerService/register.service';
import { Router } from '@angular/router';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerService: RegisterService;
  let router : Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent,HttpClientTestingModule,RouterTestingModule.withRoutes([])],
      providers: [RegisterService]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    registerService = TestBed.inject(RegisterService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the registration form with empty values', () => {
    expect(component.regForm.value).toEqual({
      fullname: '',
      userName: '',
      email: '',
      password: ''
    });
  });
  it('should set msg to true and show error message when form is invalid and submitted', () => {
    component.onSubmit();
    expect(component.msg).toBeTrue();
  });
  // it('should call register service and navigate to login page when form is valid and submitted', () => {
  //   const formData = {
  //     fullname: 'John Doe',
  //     userName: 'john.doe',
  //     email: 'john.doe@example.com',
  //     password: 'Password123'
  //   };
  //   spyOn(registerService, 'registerS').and.returnValue(throwError('Error'));
  //   component.regForm.setValue(formData);
  //   spyOn(router, 'navigate');
  //   component.onSubmit();
  //   expect(registerService.registerS).toHaveBeenCalledWith(formData);
  //   expect(component.msg).toBeFalse();
  //   expect(router.navigate).toHaveBeenCalledWith(['/login']);
   
    
  // });
 
 
  it('should return true if input field is touched and required', () => {
    const inputField = 'fullname';
    component.regForm.get(inputField)?.setValue('');
    component.regForm.get(inputField)?.markAsTouched();
    expect(component.check(inputField)).toBeTrue();
  });

});
