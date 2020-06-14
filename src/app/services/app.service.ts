import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {TokensModel} from '../modules/login/models/Tokens.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  userIn = false;
  requestStatus = false;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
  }

  activateAccount() {
    this.activatedRoute.queryParams.subscribe(params => {
      const token = params.token;
      return this.http.get<any>(`http://localhost:3333/auth/activateAccount/${token}`)
        .subscribe((m) => {
          },
          err => alert(err.error.message));
    });
  }

  public refreshTokens(): Observable<TokensModel> {
    const {refresh_token} = this.getTokens();
    return this.http.post<TokensModel>(' http://localhost:3333/auth/refresh', {refresh_token});
  }

  public logout() {
    const {access_token} = this.getTokens();
    return this.http.post(' http://localhost:3333/auth/logout', {access_token});
  }

  public getTokens(): TokensModel {
    return {
      access_token: localStorage.getItem('access_token'),
      refresh_token: localStorage.getItem('refresh_token')
    };
  }

  setRequestStatus(value) {
    this.requestStatus = value;
  }

  setUserIn(value: boolean) {
    this.userIn = value;
  }

}
