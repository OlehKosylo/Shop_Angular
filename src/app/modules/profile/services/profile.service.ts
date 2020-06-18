import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ProfileModel} from '../models/Profile.model';
import {ChangeProfileModel} from '../models/ChangeProfile.model';
import {ChangePasswordModel} from '../models/ChangePassword.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getProfile(id: number): Observable<ProfileModel> {

    return this.http.get<ProfileModel>(`http://localhost:3333/user?userId=${id}`);
  }

  changeProfileData(data: ChangeProfileModel) {

    return this.http.put<ChangeProfileModel>(`http://localhost:3333/user?userId=${data.id}`, {...data});
  }

  changePassword(passwords: ChangePasswordModel) {

    return this.http.put<ChangeProfileModel>(`http://localhost:3333/user/password?userId=${passwords.id}`, {...passwords});
  }
}
