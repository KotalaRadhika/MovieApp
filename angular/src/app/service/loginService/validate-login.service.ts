import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateLoginService {
  user!: boolean
  isLogin!: boolean
  constructor() { }
  userLogin() {
    this.user = true;
  }

  login() {
    this.isLogin = true;
  }
  logout() {
    this.isLogin = false;
  }
}