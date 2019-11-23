import { Component } from '@angular/core';
import { TokenService } from './services/token/token.service';
import { debounceTime, distinctUntilChanged, flatMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'my-app';

  constructor(
    private token: TokenService
  ) { }

  loggedIn = this.token.isLoggedIn().pipe(
    debounceTime(500),
    distinctUntilChanged(),
    flatMap((authenticated) => {
      this.handleTokenState(authenticated);
      return of(EMPTY);
    }),
  );

  handleTokenState(authenticated) {
    if (!authenticated) {
      this.token.navigateLogin();
    } else {
      this.token.navigateHome();
    }
  }
}
