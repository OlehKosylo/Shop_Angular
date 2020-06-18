import {Component, OnInit} from '@angular/core';
import {PhoneService} from '../../services/phone.service';
import {AppService} from '../../../../services/app.service';
import {ActivatedRoute} from '@angular/router';
import {PhoneModel} from '../../models/Phone.model';
import {StripeService} from '../../../Stripe/stripe.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  statusBuyComponent = true;

  phone: PhoneModel;

  public orderForma: FormGroup;

  constructor(private phoneService: PhoneService, public appService: AppService,
              private route: ActivatedRoute, private stripeService: StripeService,
              private formBuilder: FormBuilder) {
    this.orderForma = formBuilder.group({
      whereSend: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(75)]],
      count: []
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      res => (this.phone = res.phoneResolverService,
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
      good_type: this.phone.type_of_goods,
      good_id: this.phone.id,
      count: +count || 1,
      price: this.phone.price * (count || 1),
      where_send: whereSend
    });
  }

  setStatusBuyComponent(value) {
    this.statusBuyComponent = value;
  }
}

