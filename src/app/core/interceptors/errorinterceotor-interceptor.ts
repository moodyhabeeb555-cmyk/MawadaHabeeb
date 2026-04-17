import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorinterceotorInterceptor: HttpInterceptorFn = (req, next) => {
  //req

  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      // show error  tostar

      toastrService.error(err.error.message, 'FreshCart', { progressBar: true, closeButton: true });
      return throwError(() => err);
    }),
  ); // res
};
