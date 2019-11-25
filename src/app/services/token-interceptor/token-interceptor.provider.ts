import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, flatMap, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { TokenService } from '../token/token.service';
import { PresentationUrlEndpointInfo } from 'src/common/Http';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorProvider implements HttpInterceptor {

  // HTTPCodes
  readonly expiredCode = 401;
  readonly okCode = 200;

  constructor(
    private readonly token: TokenService,
    private snackBar: MatSnackBar
  ) { }

  intercept(request, next: HttpHandler) {
    const tokenObservable = this.token.getToken().pipe(
      map((token) => {
        const urlsToSkip = [
          `${PresentationUrlEndpointInfo.loginUrl}`,
        ];
        // if we have a token add it to the request
        if (token && !urlsToSkip.includes(request.url)) {
          return request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        }
        return request;
      }),
    );

    return tokenObservable.pipe(
      flatMap((req) => {
        return next.handle(req).pipe(
          catchError((err) => {
            if (err instanceof HttpErrorResponse && err.status === this.expiredCode) {
              this.token.deleteToken();
              this.token.navigateLogin();
              this.snackBar.open(err.statusText, 'OK', {
                duration: 3000,
              });
            }
            return throwError(err);
          }),
          tap((event: HttpEvent<{}>) => {
            if (event instanceof HttpResponse && event.status === this.okCode) {
              this.setToken(event);
            }
            return of(null);
          }),
          tap((event: HttpEvent<{}>) => {
            return event;
          }),
        );
      }),
    );
  }

  setToken(event) {
    const newToken = event.headers.get(this.token.key);
    if (newToken && newToken.length > 0) {
      return this.token.setToken(newToken);
    }
  }
}
