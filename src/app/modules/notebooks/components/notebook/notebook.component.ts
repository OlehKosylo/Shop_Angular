import {Component, OnInit} from '@angular/core';
import {NotebookService} from '../../services/notebook.service';
import {AppService} from '../../../../services/app.service';
import {ActivatedRoute} from '@angular/router';
import {NotebookModel} from '../../models/Notebook.model';
import {StripeService} from '../../../Stripe/stripe.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-phone',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit {

  statusBuyComponent = true;

  notebook: NotebookModel;

  public orderForma: FormGroup;

  constructor(public appService: AppService,
              private route: ActivatedRoute, private stripeService: StripeService,
              private formBuilder: FormBuilder) {
    this.orderForma = formBuilder.group({
      whereSend: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(75)]],
      count: []
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      res => (this.notebook = res.notebookResolverService,
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
      good_type: this.notebook.type_of_goods,
      good_id: this.notebook.id,
      count: +count || 1,
      price: this.notebook.price * (count || 1),
      where_send: whereSend
    });
  }

  setStatusBuyComponent(value) {
    this.statusBuyComponent = value;
  }
}

