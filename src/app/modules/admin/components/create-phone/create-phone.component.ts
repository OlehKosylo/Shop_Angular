import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {AppService} from '../../../../services/app.service';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {AdminService} from '../../services/admin.service';
import {PhoneService} from '../../../phones/services/phone.service';

@Component({
  selector: 'app-create-phone',
  templateUrl: './create-phone.component.html',
  styleUrls: ['./create-phone.component.css']
})
export class CreatePhoneComponent implements OnInit {

  file = null;
  metaData = null;
  storageRef = null;

  uploadTask: firebase.storage.UploadTask;

  createPhoneForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private appService: AppService,
              private adminService: AdminService, private phoneService: PhoneService) {
    this.createPhoneForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      price: ['', [Validators.required, Validators.min(10)]],
      screen_diagonal: ['', [Validators.required, Validators.min(3)]],
      camera_mp: ['', [Validators.required, Validators.min(1)]],
      number_of_cores: ['', [Validators.required, Validators.min(1)]],
      inner_memory: ['', [Validators.required, Validators.min(1)]],
      file: ['', [Validators.required, RxwebValidators.extension({extensions: ['jpg', 'img']})]],
    });
  }

  ngOnInit(): void {
  }

  create() {
    this.appService.setRequestStatus(true);

    const valueForSend = {
      title: this.createPhoneForm.value.title,
      description: this.createPhoneForm.value.description,
      price: this.createPhoneForm.value.price,
      screen_diagonal: this.createPhoneForm.value.screen_diagonal,
      camera_mp: this.createPhoneForm.value.camera_mp,
      number_of_cores: this.createPhoneForm.value.number_of_cores,
      inner_memory: this.createPhoneForm.value.inner_memory,
      imageURL: 'demo',
      type_of_goods: 'Phones'
    };
    this.adminService.createPhone(valueForSend)
      .subscribe(
        (res) => {
          this.storageRef = firebase.storage().ref().child(`shop/photos/phones/${res}`);
          this.uploadTask = this.storageRef.put(this.file, this.metaData);
          this.uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

            uploadSnapshot.ref.getDownloadURL()
              .then(imageURL => {
                this.phoneService.updatePhone({...valueForSend, id: +res, imageURL}).subscribe(
                  response => {
                    this.createPhoneForm.reset();
                    setTimeout(() => this.appService.setRequestStatus(false));
                    alert('Success');
                  },
                  err => {
                    alert(err.error.message);
                    setTimeout(() => this.appService.setRequestStatus(false));
                  }
                );

              });
          });
        },
        err => {
          alert(err.error.message);
          this.appService.setRequestStatus(false);
        }
      );


  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    this.metaData = {contentType: this.file.type};
  }

}
