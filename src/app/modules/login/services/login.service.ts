import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../../../services/app.service';
import {UserLoginModel} from '../models/UserLogin.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:3333/auth/login';

  constructor(private http: HttpClient, private appService: AppService, private router: Router) {
  }

  postRequestForLogin(User: UserLoginModel) {
    this.http.post<any>(this.loginUrl, {...User})
      .subscribe(
        message => {
          localStorage.setItem('access_token', message.access_token);
          localStorage.setItem('refresh_token', message.refresh_token);

          this.router.navigate(['/']);
          this.appService.setUserIn(true);
        }
      );
  }

}


