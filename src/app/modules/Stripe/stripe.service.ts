import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BuyRequestModel} from '../main/models/buyRequest.model';
import {AppService} from '../../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(public http: HttpClient, public router: Router, private appService: AppService) {
  }

  openCheckout(buyReqObj: BuyRequestModel) {
    const handler = (<any> window).StripeCheckout.configure({
      key: 'pk_test_uwJfMaTLb0OKVoNrSXIkaHZm00KU712Vlv',
      locale: 'auto',
      token: token => {
        this.appService.setRequestStatus(true);
        this.http.post(' http://localhost:3333/invoice/purchase', {...buyReqObj, stripeTokenId: token.id})
          .subscribe(
              res => {
                alert('Success! Please wait for the order');
                this.navigate('/');
                this.appService.setRequestStatus(false);
              },
              error => {
                console.log(error);
                alert(error.error.message);
                this.appService.setRequestStatus(false);
              }
            );
      }
    });

    handler.open({
      name: 'Otto Stripe Payment',
      description: `test`,
      amount: buyReqObj.price * 100,
    });

  }

  navigate(value){
    this.router.navigate([value]);
  }

}
