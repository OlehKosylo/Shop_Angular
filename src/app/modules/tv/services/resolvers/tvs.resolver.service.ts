import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {PreViewTVModel} from '../../models/preViewTV.model';
import {TvService} from '../tv.service';


@Injectable()
export class TvsResolverService implements Resolve<PreViewTVModel[]> {
  constructor(private phoneService: TvService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PreViewTVModel[]> {
    return this.phoneService.getTVs();
  }
}
