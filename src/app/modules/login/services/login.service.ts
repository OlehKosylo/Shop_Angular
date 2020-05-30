import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {AppService} from '../../../services/app.service';
import {UserLoginModel} from '../models/UserLogin.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8081/api/auth/login';

  constructor(private http: HttpClient, private appService: AppService) {
  }

  postRequestForLogin(User: UserLoginModel) {
    return this.http.post<any>(this.loginUrl, {...User}).pipe(
      catchError(this.appService.handleError),
    );
  }

  public getToken(): string {
    return localStorage.getItem('Token');
  }

}
