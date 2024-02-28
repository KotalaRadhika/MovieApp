import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { LoginService } from '../../service/loginService/login.service';
import { Router } from '@angular/router';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [LoginService,Router]
    }).compileComponents();
  });

  beforeEach(() => {
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);    
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });
  it('form should be valid with correct inputs', () => {
    const username = component.loginForm.controls['username'];
    const password = component.loginForm.controls['password'];
    username.setValue('testuser');
    password.setValue('testpassword');
    expect(component.loginForm.valid).toBeTruthy();
  });
  it('should call loginUser method on form submission', () => {
    spyOn(component, 'loginUser');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.loginUser).toHaveBeenCalled();
  });
  it('should navigate to home page on successful login', () => {
    const mockData = { token: 'mockToken' };
    spyOn(loginService, 'doLogin').and.returnValue(of(mockData));    
    spyOn(component['router'], 'navigate');
    component.userRequest.username = 'testuser';
    component.userRequest.password = 'testpassword';
    component.loginUser();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/home']);
    //expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
  it('should display error message on login failure', () => {
    const errorMessage = 'Invalid credentials';
    const mockError = { message: errorMessage };
    spyOn(loginService, 'doLogin').and.returnValue(of(mockError));
    component.userRequest.username = 'testUser';
    component.userRequest.password = 'invalidpassword';
    component.loginUser();
    
  });
});