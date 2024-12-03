import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isAdmin()) {
    return true;
  }
  else {
    alert('Access Denied: Admins Only');
    inject(Router).navigate(['/login']);
    return false;
  }
};
