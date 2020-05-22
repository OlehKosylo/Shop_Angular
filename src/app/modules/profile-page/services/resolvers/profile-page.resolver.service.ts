import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserInfo} from '../../models/UserInfo.model';
import {ProfilePageService} from '../profile-page.service';


@Injectable()
export class ProfilePageResolverService implements Resolve<UserInfo> {
  constructor(private profilePageService: ProfilePageService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInfo> {
    return this.profilePageService.getUserInfo(localStorage.getItem('userId'));
  }
}
