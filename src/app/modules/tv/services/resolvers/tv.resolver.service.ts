import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {TvService} from '../tv.service';
import {TVModel} from '../../models/TV.model';


@Injectable()
export class TvResolverService implements Resolve<TVModel> {
  constructor(private tvService: TvService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TVModel> {

    return this.tvService.getTV(route.params.id);
  }
}
