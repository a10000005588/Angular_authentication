import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // this.authService.user.subscribe();
    // return next.handle(req);
    // ...
    // since there are two observable , we need to use exhaustMap to handle it.
    // to swap the authService.user observable to next.handle observable
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        // if we have login, then we just return the req
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
