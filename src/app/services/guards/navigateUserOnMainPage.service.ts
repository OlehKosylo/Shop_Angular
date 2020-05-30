import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class NavigateUserOnMainPageService implements CanActivate {

  constructor(private appSerice: AppService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.appSerice.userIn) {
      this.router.navigate(['/main']);
    }
    return true;
  }
}
