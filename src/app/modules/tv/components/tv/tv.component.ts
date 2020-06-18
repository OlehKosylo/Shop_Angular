import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../services/app.service';
import {ActivatedRoute} from '@angular/router';
import {TVModel} from '../../models/TV.model';
import {StripeService} from '../../../Stripe/stripe.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-phone',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {

  statusBuyComponent = true;

  tv: TVModel;

  public orderForma: FormGroup;

  constructor(public appService: AppService, private route: ActivatedRoute,
              private stripeService: StripeService, private formBuilder: FormBuilder) {
    this.orderForma = formBuilder.group({
      whereSend: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(75)]],
      count: []
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      res => (this.tv = res.tvResolverService,
          setTimeout(() => this.appService.setRequestStatus(false))
      ),
      err => (
        setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message))
    );

  }

  buyPhone() {
    const {count, whereSend} = this.orderForma.value;

    this.stripeService.openCheckout({
      user_id: this.appService.userId,
      good_type: this.tv.type_of_goods,
      good_id: this.tv.id,
      count: +count || 1,
      price: this.tv.price * (count || 1),
      where_send: whereSend
    });
  }

  setStatusBuyComponent(value) {
    this.statusBuyComponent = value;
  }
}

