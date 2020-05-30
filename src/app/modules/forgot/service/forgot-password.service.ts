import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../../../services/app.service';
import {RecoverPassModel} from '../models/recoverPass.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  showRecoverPageStatus = false;

  constructor(private http: HttpClient, private appService: AppService, private router: Router) {
  }

  postDataForRecoverPass(newPass: RecoverPassModel , userId) {
    this.appService.setRequestStatus(true);
    this.http.post('http://localhost:8081/api/auth/recoverPass', {password: newPass.password, userId})
      .subscribe((m) => {
          alert('Success');
          setTimeout(() => this.appService.setRequestStatus(false));
          this.router.navigate(['/login']);
        },
        err => {
          setTimeout(() => this.appService.setRequestStatus(false));
          alert(err.error.message);
        });
  }

  postEmailForCheckValid(mail: string) {
    this.appService.setRequestStatus(true);
    this.http.post('http://localhost:8081/api/auth/checkEmail', {mail})
      .subscribe((m) => {
          alert('Success. Check your email for recover your password');
          setTimeout(() => this.appService.setRequestStatus(false));
          this.router.navigate(['/login']);
        },
        err => {
          setTimeout(() => this.appService.setRequestStatus(false));
          alert(err.error.message);
        });
  }

  postTokenForCheckValid(token: string, userId: string) {
    this.http.post('http://localhost:8081/api/auth/checkToken', {userId, token})
      .subscribe((m) => {
          this.showRecoverPageStatus = true;
        },
        err => {
          alert(err.error.message);
        });
  }
}
