import {Component, OnInit} from '@angular/core';
import {ProfilePageService} from '../../services/profile-page.service';
import {StripeService} from '../../../Stripe/stripe.service';
import * as firebase from 'firebase';
import {MainPageService} from '../../../main-page/services/main-page.service';
import {AppService} from '../../../../services/app.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  uploadTask: firebase.storage.UploadTask;
  metaData = null;
  storageRef = null;
  photo = null;

  constructor(public profilePageService: ProfilePageService, public mainPageService: MainPageService,
              public stripeService: StripeService, private appService: AppService) {
  }

  ngOnInit(): void {
  }

  activateCard() {
    this.stripeService.openCheckout(0);
  }

  changeCard() {
    this.stripeService.changeCard(this.profilePageService.user.stripe_card_id, this.profilePageService.user.stripe_customer_id,
      this.profilePageService.user.token_stripe);
  }


  onFileSelected(event) {
    this.photo = event.target.files[0];
    this.metaData = {contentType: this.photo.type};
    this.storageRef = firebase.storage().ref().child(`users/photos/userId=${this.profilePageService.user.id}:profilePhoto`);

    this.uploadPhoto();
  }

  uploadPhoto() {
    this.appService.setRequestStatus(true);
    this.uploadTask = this.storageRef.put(this.photo, this.metaData);

    this.uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      uploadSnapshot.ref.getDownloadURL()
        .then(downloadURL => {
          this.mainPageService.editPhotoInProfile(this.profilePageService.user.id, downloadURL);
          setTimeout(() => this.appService.setRequestStatus(false));
        });
    });
  }


}
