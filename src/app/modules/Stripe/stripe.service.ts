import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(public http: HttpClient, public router: Router) {
  }

  openCheckout(price: number) {
    const handler = (<any> window).StripeCheckout.configure({
      key: 'pk_test_uwJfMaTLb0OKVoNrSXIkaHZm00KU712Vlv',
      locale: 'auto',
      token: token => {
      }
    });

    handler.open({
      name: 'Otto Stripe Payment',
      description: `test`,
      amount: price * 100,
    });

  }

}
