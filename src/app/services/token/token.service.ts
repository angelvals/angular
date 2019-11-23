import { Injectable } from '@angular/core';
import { of, Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  notifier = new Subject<boolean>();
  public key = 'X-Bearer-Token';

  constructor(
    private readonly router: Router
  ) { }

  setToken(token: string) {
    this.notifier.next(true);
    return of (localStorage.setItem(this.key, token));
  }

  getToken() {
    return of (localStorage.getItem(this.key));
  }

  deleteToken() {
    this.notifier.next(false);
    return of (localStorage.removeItem(this.key));
  }

  navigateHome() {
    this.router.navigateByUrl('/home');
  }

  navigateLogin() {
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(): Observable<boolean> {
    return this.notifier.asObservable();
  }
}
