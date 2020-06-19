import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {AppService} from '../../../../services/app.service';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {AdminService} from '../../services/admin.service';
import {HttpClient} from '@angular/common/http';
import {TvService} from '../../../tv/services/tv.service';

@Component({
  selector: 'app-create-phone',
  templateUrl: './create-tv.component.html',
  styleUrls: ['./create-tv.component.css']
})
export class CreateTvComponent implements OnInit {

  file = null;
  metaData = null;
  storageRef = null;

  uploadTask: firebase.storage.UploadTask;

  createTVForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private appService: AppService,
              private adminService: AdminService, private tvService: TvService) {
    this.createTVForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      price: ['', [Validators.required, Validators.min(10)]],
      screen_diagonal: ['', [Validators.required, Validators.min(3)]],
      smart_tv_support: ['', [Validators.required]],
      smart_platform: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      hdr: ['', [Validators.required, Validators.min(1)]],
      file: ['', [Validators.required, RxwebValidators.extension({extensions: ['jpg', 'img']})]],
    });
  }

  ngOnInit(): void {
  }

  create() {
    this.appService.setRequestStatus(true);

    const valueForSend = {
      title: this.createTVForm.value.title,
      description: this.createTVForm.value.description,
      price: this.createTVForm.value.price,
      screen_diagonal: this.createTVForm.value.screen_diagonal,
      smart_tv_support: this.createTVForm.value.smart_tv_support,
      smart_platform: this.createTVForm.value.smart_platform,
      hdr: this.createTVForm.value.hdr,
      imageURL: 'demo',
      type_of_goods: 'TV'
    };
    this.adminService.createTV(valueForSend)
      .subscribe(
        (res) => {
          this.storageRef = firebase.storage().ref().child(`shop/photos/TVs/${res}`);
          this.uploadTask = this.storageRef.put(this.file, this.metaData);
          this.uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

            uploadSnapshot.ref.getDownloadURL()
              .then(imageURL => {
                this.tvService.updateTV({...valueForSend, id: +res, imageURL}).subscribe(
                  response => {
                    this.createTVForm.reset();
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
