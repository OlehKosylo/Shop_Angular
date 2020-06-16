import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {PreViewPhoneModel} from '../../models/preViewPhone.model';
import {PhoneService} from '../phone.service';


@Injectable()
export class PhonesResolverService implements Resolve<PreViewPhoneModel[]> {
  constructor(private phoneService: PhoneService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PreViewPhoneModel[]> {
    return this.phoneService.getPhones();
  }
}
