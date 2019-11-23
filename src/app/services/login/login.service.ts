import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EMPTY, of } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { PresentationUrlEndpointInfo } from '../../../common/Http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  doLogin(username: string, password: string) {
    return this.http.post(PresentationUrlEndpointInfo.loginUrl, { username, password }, { observe: 'response' }).pipe(
      flatMap((httpResponse: HttpResponse<ArrayBuffer>) => {
        console.log(httpResponse);
        return of (EMPTY);
      })
    );
  }
}
