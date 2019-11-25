import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptorProvider implements HttpInterceptor {
  constructor(public loaderService: LoaderService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.loaderService.show();
      return next.handle(req).pipe(
        finalize(() => this.loaderService.hide())
      );
    }
}
