import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppService} from '../../../services/app.service';
import {StripeService} from '../../Stripe/stripe.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  basketArray: any = [];
  arrayBasketKeys: any = [];
  price = 0;

  constructor(private http: HttpClient, private appService: AppService, private stripeService: StripeService) {
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3333/invoice/allGoods');
  }

  deteleOfBasket(id: number, price: number) {
    this.basketArray = this.basketArray.filter(obj => obj.id !== id);
    this.arrayBasketKeys = [];
    this.price = this.price - price;
    this.getKeys(this.basketArray);
  }

  getPriceForGoods() {
    for (let i = 0; i < this.basketArray.length; i++) {
      const priceForGood = this.basketArray[i].price * this.basketArray[i].count;
      this.price = priceForGood + this.price;
    }
  }

  getKeys(array) {
    this.arrayBasketKeys = [];
    for (let i = 0; i < array.length; i++) {
      this.arrayBasketKeys.push(Object.entries(array[i]));
    }
  }

  buyOfBasket(adress: string) {
    const arrayGoods = [];
    const userId = this.appService.userId;

    for (let i = 0; i < this.arrayBasketKeys.length; i++) {
      if (this.arrayBasketKeys[i][10][1] === 'Notebooks') {
        arrayGoods.push({
          user_id: userId,
          good_type: this.arrayBasketKeys[i][10][1],
          good_id: this.arrayBasketKeys[i][0][1],
          count: this.arrayBasketKeys[i][11][1],
          price: this.arrayBasketKeys[i][3][1],
          where_send: adress,
        });
      } else if (this.arrayBasketKeys[i][9][1] === 'Phones' || this.arrayBasketKeys[i][9][1] === 'TV') {
        arrayGoods.push({
          user_id: userId,
          good_type: this.arrayBasketKeys[i][9][1],
          good_id: this.arrayBasketKeys[i][0][1],
          count: this.arrayBasketKeys[i][10][1],
          price: this.arrayBasketKeys[i][3][1],
          where_send: adress,
        });
      }


    }

    this.stripeService.openCheckout(arrayGoods, this.price, true);
  }
}


