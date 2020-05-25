import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MainPageService} from '../main-page.service';
import {UserInfo} from '../../models/UserInfo.model';

@Injectable()
export class MainPageResolverService implements Resolve<UserInfo> {
  constructor(private mainPageService: MainPageService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInfo> {
    const id = localStorage.getItem('userId');
    return this.mainPageService.getUserInfo(id);
  }
}
