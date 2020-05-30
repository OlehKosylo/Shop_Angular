import {Component, Input, OnInit} from '@angular/core';
import {StripeService} from '../../stripe.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.css']
})
export class BankCardComponent implements OnInit {

  @Input() price;

  public bankCardForma: FormGroup;

  constructor(private formBuilder: FormBuilder, public stripeService: StripeService) {
    this.bankCardForma = formBuilder.group({
      card_number: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      card_expiry: ['', [Validators.required]],
      card_cvc: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  messages = {
    validDate: 'valid\ndate',
    monthYear: 'mm/yyyy',
  };

  placeholders = {
    number: '•••• •••• •••• ••••',
    name: 'Full Name',
    expiry: '••/••',
    cvc: '•••'
  };

  masks = {
    cardNumber: '•'
  };

  ngOnInit(): void {
  }


  openCheckout() {
    this.stripeService.chargeCard({bankCard: this.bankCardForma.value, price: this.price});
  }

}
