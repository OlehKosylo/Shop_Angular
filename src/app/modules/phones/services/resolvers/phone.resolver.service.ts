import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {PreViewPhoneModel} from '../../models/preViewPhone.model';
import {PhoneService} from '../phone.service';
import {PhoneModel} from '../../models/Phone.model';


@Injectable()
export class PhoneResolverService implements Resolve<PhoneModel> {
  constructor(private phoneService: PhoneService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PhoneModel> {

    return this.phoneService.getPhone(route.params.id);
  }
}
