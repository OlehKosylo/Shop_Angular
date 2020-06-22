import {Component, OnInit} from '@angular/core';
import {NotebookService} from '../../services/notebook.service';
import {AppService} from '../../../../services/app.service';
import {ActivatedRoute} from '@angular/router';
import {NotebookModel} from '../../models/Notebook.model';
import {StripeService} from '../../../Stripe/stripe.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import * as firebase from 'firebase';
import {MainService} from '../../../main/services/main.service';

@Component({
  selector: 'app-phone',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit {

  file = null;
  metaData = null;
  storageRef = null;
  uploadTask: firebase.storage.UploadTask;

  notebook: NotebookModel;

  statusBuyComponent = true;
  statusBasketComponent = true;
  statusUpdateForm = false;

  public updateForma: FormGroup;
  public orderForma: FormGroup;
  count = 1;

  constructor(public appService: AppService, private route: ActivatedRoute,
              private stripeService: StripeService, private formBuilder: FormBuilder,
              public notebookService: NotebookService, private mainService: MainService) {
    this.orderForma = formBuilder.group({
      whereSend: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(75)]],
      count: []
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      res => (this.notebook = res.notebookResolverService,
          this.updateForma = this.formBuilder.group({
            title: [this.notebook.title, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
            description: [this.notebook.description, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
            price: [this.notebook.price, [Validators.required, Validators.min(10)]],
            screen_diagonal: [this.notebook.screen_diagonal, [Validators.required, Validators.min(3)]],
            processor: [this.notebook.processor, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
            ram: [this.notebook.ram, [Validators.required, Validators.min(1)]],
            storage_capacity: [this.notebook.storage_capacity, [Validators.required, Validators.min(1)]],
            graphics_card: [this.notebook.graphics_card, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
            file: ['', [RxwebValidators.extension({extensions: ['jpg', 'img', 'png']})]],
          }),
          setTimeout(() => this.appService.setRequestStatus(false))
      ),
      err => (
        setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message))
    );

  }

  buyNotebook() {
    const {count, whereSend} = this.orderForma.value;

    this.stripeService.openCheckout({
      user_id: this.appService.userId,
      good_type: this.notebook.type_of_goods,
      good_id: this.notebook.id,
      count: +count || 1,
      price: this.notebook.price * (count || 1),
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
      processor: this.updateForma.value.processor,
      ram: this.updateForma.value.ram,
      storage_capacity: this.updateForma.value.storage_capacity,
      graphics_card: this.updateForma.value.graphics_card,
      imageURL: this.notebook.imageURL,
      type_of_goods: 'Notebooks'
    };

    if (this.updateForma.value.file.length > 0) {
      this.uploadTask = this.storageRef.put(this.file, this.metaData);
      this.uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

        uploadSnapshot.ref.getDownloadURL()
          .then(imageURL => {
            updateValue.imageURL = imageURL;
            this.updateNotebook(updateValue);
          });
      });
    } else {
      this.updateNotebook(updateValue);
    }

  }

  updateNotebook(updateForma) {
    this.notebookService.updateNotebook({...this.notebook, ...updateForma}).subscribe(
      res => {
        this.notebook = {...this.notebook, ...updateForma};
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
      if (this.mainService.basketArray[i].id === this.notebook.id) {
        checkCoincidence = true;
      }
    }

    if (!checkCoincidence) {
      this.mainService.basketArray.push({...this.notebook, count: this.count});
    }

  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    this.metaData = {contentType: this.file.type};
    this.storageRef = firebase.storage().ref().child(`shop/photos/notebooks/${this.notebook.id}`);
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

