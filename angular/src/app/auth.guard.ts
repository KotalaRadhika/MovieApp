import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);

  let loggedIn = sessionStorage.getItem("loginStatus");
  if(loggedIn=='false'){
    Swal.fire({
      title: "Sorry!",
      text: "Please Login"
    });
    router.navigate(['/login']);
    return false;
  }
  return true;
};
