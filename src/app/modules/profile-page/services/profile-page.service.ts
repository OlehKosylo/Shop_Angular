import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserInfo} from '../models/UserInfo.model';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {EditUserInfo} from '../models/EditUserInfo.model';
import {MainPageService} from '../../main-page/services/main-page.service';
import {AppService} from '../../../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {
  user: UserInfo;

  placeholders = {
    number: '•••• •••• •••• ••••',
    name: 'Full Name',
    expiry: '••/••',
    cvc: '•••'
  };

  constructor(private http: HttpClient, public  mainPageService: MainPageService,
              private appService: AppService) {
  }

  getUserInfo(id: string): Observable<UserInfo> {
    this.appService.setRequestStatus(true);
    return this.http.get<UserInfo>('http://localhost:8081/api/main/userInfoForProfilePage?userId=' + id)
      .pipe(tap(user => (this.user = user,
          setTimeout(() => this.appService.setRequestStatus(false)),
        user.stripe_card_id && (
          this.placeholders.expiry = user.card.exp_month + ' / ' + user.card.exp_year,
            this.placeholders.name = user.card.name,
            this.placeholders.number = '•••• •••• •••• ' + user.card.last4
        )
      )));
  }

  editUserInfo(User: EditUserInfo) {
    this.appService.setRequestStatus(true);
    this.http.post<EditUserInfo>('http://localhost:8081/api/main/userEditInfo', {...User})
      .subscribe((newUser) => {
          this.user = {...this.user, ...newUser};
          this.mainPageService.setUser(newUser);
          setTimeout(() => this.appService.setRequestStatus(false));
        },
        err => (
          setTimeout(() => this.appService.setRequestStatus(false)) ,
            alert(err.error.message)));
  }

}

