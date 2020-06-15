import {Injectable, Injector} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, Subject, throwError, of} from 'rxjs';

import {catchError, switchMap, tap} from 'rxjs/operators';
import {AppService} from './services/app.service';
import {Router} from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {
  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(private injector: Injector, private appService: AppService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (this.appService.userIn) {
      request = this.header(request);

      return next.handle(request).pipe(catchError(error => {
        return this.handleResponseError(error, request, next);
      }));
    } else {
      return next.handle(request);
    }
  }

  header(request) {
    const token = localStorage.getItem('access_token');
    return request.clone({
      setHeaders: {
        Authorization: token
      }
    });
  }

  refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;

      return this.appService.refreshTokens().pipe(
        tap((res) => {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next();
        }),
      );
    }
  }

  handleResponseError(error, request?, next?) {
    if (error.error.code === 4012) {
      this.logout();
    } else if (error.status === 401) {
      return this.refreshToken().pipe(
        switchMap(() => {
          request = this.header(request);
          return next.handle(request);
        }),
        catchError(e => {
          if (e.status !== 401) {
            return this.handleResponseError(e);
          }
        })
      );
    }
    // else {
    //   this.appService.setRequestStatus(false);
    //   alert(error.error.message);
    // }

    return throwError(error);
  }

  logout() {
    this.router.navigate(['login']);
  }

}

