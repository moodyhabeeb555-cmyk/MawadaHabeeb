import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const id = inject(PLATFORM_ID);

  if (isPlatformBrowser(id)) {
    //orders  checkout wishlist  cart (login)
    if (localStorage.getItem('freshToken')) {
      return true;
    } else {
      // login or home page
      return router.parseUrl('/login');
    }
  } else {
    return true;
  }
};
