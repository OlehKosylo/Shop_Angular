import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MainPageService} from '../main-page/services/main-page.service';
import {CoursesContainerService} from '../courses/services/courses-container-service';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(public http: HttpClient, public mainPageService: MainPageService,
              private courseContainerService: CoursesContainerService,
              public appService: AppService, public router: Router) {
  }


  chargeCard(resValue) {
    const bankCard = resValue.bankCard;
    this.appService.setRequestStatus(true);
    this.http.post(`http://localhost:8081/payment/charge`,
      {...bankCard, price: resValue.price, courseId: this.courseContainerService.getCourseId()})
      .subscribe(
        resp => {
          this.courseContainerService.setBoughtCourse();
          setTimeout(() => this.appService.setRequestStatus(false));
          alert('Success, enjoy your course');
          this.router.navigate(['/main/my-courses']);
        },
        err => {
          setTimeout(() => this.appService.setRequestStatus(false));
          alert('Something went wrong. Please try again');
        }
      );

  }

  activateCard(tokenStripe: string, cardId: string) {
    this.appService.setRequestStatus(true);
    this.http.post('http://localhost:8081/payment/activateCard',
      {tokenStripe, userId: this.mainPageService.getUserId(), cardId})
      .subscribe(
        resp => {
          this.appService.setCardStatus(resp);
          setTimeout(() => this.appService.setRequestStatus(false));
          window.location.reload();
        },
        err => {
          setTimeout(() => this.appService.setRequestStatus(false));
          alert('Something went wrong. Please try again');
        }
      );
  }


  openCheckout(price: number) {
    const handler = (<any> window).StripeCheckout.configure({
      key: 'pk_test_uwJfMaTLb0OKVoNrSXIkaHZm00KU712Vlv',
      locale: 'auto',
      token: token => {
        if (price === 0) {
          this.activateCard(token.id, token.card.id);
        }
      }
    });

    handler.open({
      name: 'Otto Stripe Payment',
      description: `User ${this.mainPageService.getUserId()} bought course ${this.mainPageService.getCourseId()}`,
      amount: price * 100,
    });

  }

  changeCard(cardId: string, stripeCustomerId: string, tokenStripe: string) {
    const handler = (<any> window).StripeCheckout.configure({
      key: 'pk_test_uwJfMaTLb0OKVoNrSXIkaHZm00KU712Vlv',
      locale: 'auto',
      token: token => {
        this.appService.setRequestStatus(true);
        this.http.post('http://localhost:8081/payment/changeCard',
          {cardId, stripeCustomerId, tokenStripe, userId: this.mainPageService.getUserId()})
          .subscribe(resp => {
              this.activateCard(token.id, token.card.id);
              setTimeout(() => this.appService.setRequestStatus(false));
            },
            err => {
              setTimeout(() => this.appService.setRequestStatus(false));
              alert('Something went wrong. Please try again');
            });
      }
    });

    handler.open({
      name: 'Otto Stripe Payment',
      description: `Activation card`,
      amount: 0,
    });
  }
}
