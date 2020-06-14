import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../../../services/app.service';
import {RecoverPassModel} from '../models/recoverPass.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient, private appService: AppService, private router: Router) {
  }

  postDataForRecoverPass(newPass: RecoverPassModel, token) {
    this.appService.setRequestStatus(true);
    this.http.post('http://localhost:3333/auth/recoverPassword/setNew', {password: newPass.password, token})
      .subscribe((m) => {
          alert('Success');
          setTimeout(() => this.appService.setRequestStatus(false));
          this.router.navigate(['/login']);
        });
  }

  postEmailForCheckValid(email: string) {
    this.appService.setRequestStatus(true);
    this.http.post('http://localhost:3333/auth/recoverPassword', {email})
      .subscribe((m) => {
          alert('Success. Check your email for recover your password');
          setTimeout(() => this.appService.setRequestStatus(false));
          this.router.navigate(['/login']);
        });
  }
}
