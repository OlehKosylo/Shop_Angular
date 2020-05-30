import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class ActivatedCardGuardService implements CanActivate {

  constructor(private appSerice: AppService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.appSerice.cardStatus) {
      alert('Activate your card before creating course. Check your profile.');
    }
    return this.appSerice.cardStatus;
  }
}
