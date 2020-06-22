import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderModel} from '../../models/order.model';
import {AppService} from '../../../../services/app.service';

@Component({
  selector: 'app-order-container',
  templateUrl: './order-container.component.html',
  styleUrls: ['./order-container.component.css']
})
export class OrderContainerComponent implements OnInit {

  ordersArray: OrderModel[] = [];

  constructor(private route: ActivatedRoute, private appService: AppService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      orders => (
        orders.allOrdersResolverService && (this.ordersArray = orders.allOrdersResolverService),
        orders.completedOrdersResolverService && (this.ordersArray = orders.completedOrdersResolverService),
        orders.doesntDoneOrdersResolverService && (this.ordersArray = orders.doesntDoneOrdersResolverService),
          setTimeout(() => this.appService.setRequestStatus(false))
      ),
      err => (
        setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message))
    );

  }
}
