import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EMPTY, of } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { PresentationUrlEndpointInfo } from '../../../common/Http';
import { TokenService } from '../token/token.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
  ) { }

  doLogin(username: string, password: string) {
    return this.http.post(PresentationUrlEndpointInfo.loginUrl, { username, password }, { observe: 'response' }).pipe(
      flatMap((httpResponse: HttpResponse<ArrayBuffer>) => {
        const token = httpResponse.body['token'];
        if (token) {
          this.tokenService.setToken(token);
        }
        return of (EMPTY);
      }),
      catchError((httpError: HttpErrorResponse) => {
        this.snackBar.open(httpError.error.message, 'OK', {
          duration: 3000,
        });
        return of (httpError);
      }),
    );
  }

  getUserSession() {
    return this.http.get(`${PresentationUrlEndpointInfo.baseUrl}/${PresentationUrlEndpointInfo.keys.user}`);
  }
}
