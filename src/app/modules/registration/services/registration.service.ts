import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../models/User.model';
import {AppService} from '../../../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient, private appService: AppService) {
  }


  postRequestForRegistration(User: UserModel) {
    this.appService.setRequestStatus(true);
    this.http.post<UserModel>('http://localhost:8081/api/auth/register', {...User})
      .subscribe((m) => {
          alert('Success. Check your mail for activate account!');
          setTimeout(() => this.appService.setRequestStatus(false));
        },
        err => {
          setTimeout(() => this.appService.setRequestStatus(false))
          alert(err.error.message);
        });
  }
}
