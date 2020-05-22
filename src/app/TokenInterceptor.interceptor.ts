import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {LoginService} from './modules/login/services/login.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AppService} from './services/app.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public login: LoginService, private router: Router, private appService: AppService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const statusToken = this.login.isAuthenticated();
    //
    // console.log(statusToken)

    request = request.clone({
      setHeaders: {
        Authorization: `${this.login.getToken()}`
      }
    });

    return next.handle(request);
  }
}

