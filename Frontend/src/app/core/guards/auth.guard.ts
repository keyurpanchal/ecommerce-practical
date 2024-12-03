import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (!!localStorage.getItem('token')) {
    return true;
  }
  else {
    alert('Access Denied: Please Login');
    inject(Router).navigate(['/login']);
    return false;
  }
};
