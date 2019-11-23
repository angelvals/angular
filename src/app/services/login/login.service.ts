import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EMPTY, of } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { PresentationUrlEndpointInfo } from '../../../common/Http';

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
        this.getUserSession(httpResponse.body);
        return of (EMPTY);
      })
    );
  }

  getUserSession(response) {
    this.http.get(`${PresentationUrlEndpointInfo.baseUrl}${PresentationUrlEndpointInfo.keys.user}`,
    {
      headers: {
        Authorization: `Bearer ${response.token}`,
        'Content-Type': 'application/json',
      }
    }).pipe(
      flatMap((response: any) => {
        console.log(response);
        return of (EMPTY);
      })
    ).subscribe();
  }
}
