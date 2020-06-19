import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {AppService} from '../../../../services/app.service';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {AdminService} from '../../services/admin.service';
import {HttpClient} from '@angular/common/http';
import {NotebookService} from '../../../notebooks/services/notebook.service';

@Component({
  selector: 'app-create-phone',
  templateUrl: './create-notebook.component.html',
  styleUrls: ['./create-notebook.component.css']
})
export class CreateNotebookComponent implements OnInit {

  file = null;
  metaData = null;
  storageRef = null;

  uploadTask: firebase.storage.UploadTask;

  createNotebookForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private appService: AppService,
              private adminService: AdminService, private notebookService: NotebookService) {
    this.createNotebookForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      price: ['', [Validators.required, Validators.min(10)]],
      screen_diagonal: ['', [Validators.required, Validators.min(3)]],
      processor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      ram: ['', [Validators.required, Validators.min(1)]],
      storage_capacity: ['', [Validators.required, Validators.min(1)]],
      graphics_card: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      file: ['', [Validators.required, RxwebValidators.extension({extensions: ['jpg', 'img']})]],
    });
  }

  ngOnInit(): void {
  }

  create() {
    this.appService.setRequestStatus(true);

    const valueForSend = {
      title: this.createNotebookForm.value.title,
      description: this.createNotebookForm.value.description,
      price: this.createNotebookForm.value.price,
      screen_diagonal: this.createNotebookForm.value.screen_diagonal,
      processor: this.createNotebookForm.value.processor,
      ram: this.createNotebookForm.value.ram,
      storage_capacity: this.createNotebookForm.value.storage_capacity,
      graphics_card: this.createNotebookForm.value.graphics_card,
      imageURL: 'demo',
      type_of_goods: 'Notebooks'
    };
    this.adminService.createNotebook(valueForSend)
      .subscribe(
        (res) => {
          this.storageRef = firebase.storage().ref().child(`shop/photos/notebooks/${res}`);
          this.uploadTask = this.storageRef.put(this.file, this.metaData);
          this.uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

            uploadSnapshot.ref.getDownloadURL()
              .then(imageURL => {
                this.notebookService.updateNotebook({...valueForSend, id: +res, imageURL}).subscribe(
                  response => {
                    this.createNotebookForm.reset();
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
