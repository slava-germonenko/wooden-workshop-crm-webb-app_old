import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ACCESS_TOKEN_COOKIE_NAME } from '@app/common/constants';

@Injectable()
export class WithTokenInterceptor implements HttpInterceptor {
  public constructor(private readonly cookieService: CookieService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.cookieService.get(ACCESS_TOKEN_COOKIE_NAME);
    if (!authToken) {
      return next.handle(req);
    }

    const withCredentialsReq = req.clone({
      withCredentials: true,
      headers: req.headers.append('Authorization', `Bearer ${authToken}`),
    });

    return next.handle(withCredentialsReq);
  }
}
