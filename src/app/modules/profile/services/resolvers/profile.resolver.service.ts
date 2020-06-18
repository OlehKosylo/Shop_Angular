import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ProfileService} from '../profile.service';
import {ProfileModel} from '../../models/Profile.model';
import {AppService} from '../../../../services/app.service';


@Injectable()
export class ProfileResolverService implements Resolve<ProfileModel> {
  constructor(private profileService: ProfileService, private appService: AppService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProfileModel> {

    return this.profileService.getProfile(this.appService.userId);
  }
}
