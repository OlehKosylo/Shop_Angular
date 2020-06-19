import {Component, OnInit} from '@angular/core';
import {PhoneService} from '../../services/phone.service';
import {AppService} from '../../../../services/app.service';
import {ActivatedRoute} from '@angular/router';
import {PhoneModel} from '../../models/Phone.model';
import {StripeService} from '../../../Stripe/stripe.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import * as firebase from 'firebase';


@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  file = null;
  metaData = null;
  storageRef = null;
  uploadTask: firebase.storage.UploadTask;

  statusBuyComponent = true;
  statusUpdateForm = false;

  updateForma: FormGroup;
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
          this.updateForma = this.formBuilder.group({
            title: [this.phone.title, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
            description: [this.phone.description, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
            price: [this.phone.price, [Validators.required, Validators.min(10)]],
            screen_diagonal: [this.phone.screen_diagonal, [Validators.required, Validators.min(3)]],
            camera_mp: [this.phone.camera_mp, [Validators.required, Validators.min(1)]],
            number_of_cores: [this.phone.number_of_cores, [Validators.required, Validators.min(1)]],
            inner_memory: [this.phone.inner_memory, [Validators.required, Validators.min(1)]],
            file: ['', [RxwebValidators.extension({extensions: ['jpg', 'img', 'png']})]],
          }),
          setTimeout(() => this.appService.setRequestStatus(false))
      ),
      err => (
        setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message)));
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


  update() {
    this.appService.setRequestStatus(true);
    const updateValue = {
      title: this.updateForma.value.title,
      description: this.updateForma.value.description,
      price: this.updateForma.value.price,
      screen_diagonal: this.updateForma.value.screen_diagonal,
      camera_mp: this.updateForma.value.camera_mp,
      number_of_cores: this.updateForma.value.number_of_cores,
      inner_memory: this.updateForma.value.inner_memory,
      imageURL: this.phone.imageURL,
      type_of_goods: 'Phones'
    };

    if (this.updateForma.value.file.length > 0) {
      this.uploadTask = this.storageRef.put(this.file, this.metaData);
      this.uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

        uploadSnapshot.ref.getDownloadURL()
          .then(imageURL => {
            updateValue.imageURL = imageURL;
            this.updatePhone(updateValue);
          });
      });
    } else {
      this.updatePhone(updateValue);
    }

  }

  updatePhone(updateForma) {
    this.phoneService.updatePhone({...this.phone, ...updateForma}).subscribe(
      res => {
        this.phone = {...this.phone, ...updateForma};
        alert('Success');
        this.appService.setRequestStatus(false);
      },
      err => {
        this.appService.setRequestStatus(false);
        alert(err.error.message);
      }
    );
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    this.metaData = {contentType: this.file.type};
    this.storageRef = firebase.storage().ref().child(`shop/photos/phones/${this.phone.id}`);
  }

  setStatusBuyComponent(value) {
    this.statusBuyComponent = value;
  }

  setStatusUpdateForm(value) {
    this.statusUpdateForm = value;
  }
}

