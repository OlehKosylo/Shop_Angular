import {Component, OnInit} from '@angular/core';
import {MainService} from '../../services/main.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  statusBuy = true;
  adress: string;
  count: string;

  constructor(public  mainService: MainService) {
  }

  ngOnInit(): void {
    this.mainService.getKeys(this.mainService.basketArray);
    this.mainService.getPriceForGoods();
  }

  deleteOfBasket(arrayWithId: number, arrayWithPrice: number) {
    const id = arrayWithId[1];
    const price = arrayWithPrice[1];
    this.mainService.deteleOfBasket(id, price);
  }

  buyOfBasket() {
    this.mainService.buyOfBasket(this.adress);
  }

  setStatusBuy() {
    this.statusBuy = !this.statusBuy;
  }
}
