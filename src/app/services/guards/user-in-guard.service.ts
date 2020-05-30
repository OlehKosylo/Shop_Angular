import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class UserInGuardService implements CanActivate {

  constructor(private appSerice: AppService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.appSerice.userIn;
  }
}
