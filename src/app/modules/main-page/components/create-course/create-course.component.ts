import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MainPageService} from '../../services/main-page.service';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import {AppService} from '../../../../services/app.service';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  public createCourseForma: FormGroup;

  file = null;
  metaData = null;
  storageRef = null;

  uploadTask: firebase.storage.UploadTask;

  constructor(private formBuilder: FormBuilder, private db: AngularFireDatabase,
              public mainPageService: MainPageService, private appService: AppService,
              private router: Router) {
    this.createCourseForma = formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(50)]],
      file: ['', [Validators.required, RxwebValidators.extension({extensions: ['mp4', 'gif']})]],
      genre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.file = event.target.files[0];

    this.metaData = {contentType: this.file.type};
    this.storageRef = firebase.storage().ref().child(`courses/videos/${this.createCourseForma.value.title}`);
  }


  createCourse() {
    this.appService.setRequestStatus(true);
    this.uploadTask = this.storageRef.put(this.file, this.metaData);

    this.uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

      uploadSnapshot.ref.getDownloadURL()
        .then(downloadURL => {
          const valueForSend = {...this.createCourseForma.value, downloadURL, userId: this.mainPageService.userId};
          this.mainPageService.postCreatedCurs(valueForSend);
          this.createCourseForma.reset();
          setTimeout(() => this.appService.setRequestStatus(false));
          this.router.navigate(['/main']);
        });
    });
  }

}
