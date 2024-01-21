import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if(sessionStorage.getItem('app.token')){
    return true;
  } else{
    router.navigate(['/login']);
    return false;
  }
};
