import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {OrderModel} from '../../models/order.model';
import {AdminService} from '../admin.service';
import {AppService} from '../../../../services/app.service';


@Injectable()
export class AllOrdersResolverService implements Resolve<OrderModel> {
  constructor(private adminService: AdminService, private appService: AppService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderModel> {
    this.appService.setRequestStatus(true);
    return this.adminService.getAllOrders();
  }
}
