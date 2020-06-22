import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from '../../models/order.model';
import {AdminService} from '../../services/admin.service';
import {AppService} from '../../../../services/app.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() order: OrderModel;
  good: any;
  goodKeyArray: any;

  constructor(private adminService: AdminService, private appService: AppService) {
  }

  ngOnInit(): void {
  }


  sendGoods(id: number) {
    this.adminService.sendGoods(id).subscribe(
      res => (
        this.appService.setRequestStatus(false),
          this.order.sending_status = 1,
          alert('Success')
      ),
      err => {
        this.appService.setRequestStatus(false);
        alert(err.error.message);
      }
    );
  }

  getGoodById(id: number, goodType: string) {
    this.adminService.getGoodById(id, goodType).subscribe(
      res => (
        this.appService.setRequestStatus(false),
          this.good = res,
          this.goodKeyArray = Object.keys(res)
      ),
      err => {
        this.appService.setRequestStatus(false);
        alert(err.error.message);
      }
    );
  }

  closeGoodInfo() {
    this.good = null;
  }
}
