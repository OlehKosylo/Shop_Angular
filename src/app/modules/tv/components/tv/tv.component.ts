import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../services/app.service';
import {ActivatedRoute} from '@angular/router';
import {TVModel} from '../../models/TV.model';
import {StripeService} from '../../../Stripe/stripe.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import * as firebase from 'firebase';
import {TvService} from '../../services/tv.service';
import {MainService} from '../../../main/services/main.service';

@Component({
  selector: 'app-phone',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {

  file = null;
  metaData = null;
  storageRef = null;
  uploadTask: firebase.storage.UploadTask;

  statusBuyComponent = true;
  statusBasketComponent = true;
  statusUpdateForm = false;

  updateForma: FormGroup;
  tv: TVModel;
  count = 1;

  public orderForma: FormGroup;

  constructor(public appService: AppService, private route: ActivatedRoute,
              private stripeService: StripeService, private formBuilder: FormBuilder,
              private tvService: TvService, private mainService: MainService) {
    this.orderForma = formBuilder.group({
      whereSend: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(75)]],
      count: []
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      res => (this.tv = res.tvResolverService,
          this.updateForma = this.formBuilder.group({
            title: [this.tv.title, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
            description: [this.tv.description, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
            price: [this.tv.price, [Validators.required, Validators.min(10)]],
            screen_diagonal: [this.tv.screen_diagonal, [Validators.required, Validators.min(3)]],
            smart_tv_support: [this.tv.smart_tv_support, [Validators.required]],
            smart_platform: [this.tv.title, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
            hdr: [this.tv.hdr, [Validators.required, Validators.min(1)]],
            file: ['', [RxwebValidators.extension({extensions: ['jpg', 'img', 'png']})]],
          }),
          setTimeout(() => this.appService.setRequestStatus(false))
      ),
      err => (
        setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message))
    );

  }

  buyTV() {
    const {count, whereSend} = this.orderForma.value;

    this.stripeService.openCheckout({
      user_id: this.appService.userId,
      good_type: this.tv.type_of_goods,
      good_id: this.tv.id,
      count: +count || 1,
      price: this.tv.price * (count || 1),
      where_send: whereSend
    }, false, false);
  }

  update() {
    this.appService.setRequestStatus(true);
    const updateValue = {
      title: this.updateForma.value.title,
      description: this.updateForma.value.description,
      price: this.updateForma.value.price,
      screen_diagonal: this.updateForma.value.screen_diagonal,
      smart_tv_support: this.updateForma.value.smart_tv_support,
      smart_platform: this.updateForma.value.smart_platform,
      hdr: this.updateForma.value.hdr,
      imageURL: this.tv.imageURL,
      type_of_goods: 'TV'
    };

    if (this.updateForma.value.file.length > 0) {
      this.uploadTask = this.storageRef.put(this.file, this.metaData);
      this.uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

        uploadSnapshot.ref.getDownloadURL()
          .then(imageURL => {
            updateValue.imageURL = imageURL;
            this.updateTV(updateValue);
          });
      });
    } else {
      this.updateTV(updateValue);
    }

  }

  updateTV(updateForma) {
    this.tvService.updateTV({...this.tv, ...updateForma}).subscribe(
      res => {
        this.tv = {...this.tv, ...updateForma};
        alert('Success');
        this.appService.setRequestStatus(false);
      },
      err => {
        this.appService.setRequestStatus(false);
        alert(err.error.message);
      }
    );
  }

  pushToBasket() {
    let checkCoincidence = false;
    for (let i = 0; i < this.mainService.basketArray.length; i++) {
      if (this.mainService.basketArray[i].id === this.tv.id) {
        checkCoincidence = true;
      }
    }

    if (!checkCoincidence) {
      this.mainService.basketArray.push({...this.tv, count: this.count});
    }
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    this.metaData = {contentType: this.file.type};
    this.storageRef = firebase.storage().ref().child(`shop/photos/TVs/${this.tv.id}`);
  }

  setStatusBuyComponent(value) {
    this.statusBuyComponent = value;
  }

  setStatusUpdateForm(value) {
    this.statusUpdateForm = value;
  }

  setStatusBasketComponent(value) {
    this.statusBasketComponent = value;
  }
}

