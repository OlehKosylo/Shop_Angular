import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MainService} from '../main.service';


@Injectable()
export class GoodsResolverService implements Resolve<any[]> {
  constructor(private mainService: MainService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.mainService.getAllProducts();
  }
}
