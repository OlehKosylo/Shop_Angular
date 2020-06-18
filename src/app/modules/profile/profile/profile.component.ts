import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileModel} from '../models/Profile.model';
import {AppService} from '../../../services/app.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileInfo: ProfileModel;
  changeProfileForma: FormGroup;
  changePasswordForma: FormGroup;
  statusChangeForm = false;
  statusChangePasswordForm = false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
              public appService: AppService, public profileService: ProfileService) {
    this.changePasswordForma = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      duplicate_password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      res => (this.profileInfo = res.profileResolverService,
          this.changeProfileForma = this.formBuilder.group({
            name: [this.profileInfo.name, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
            surname: [this.profileInfo.surname, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
            age: [this.profileInfo.age, [Validators.required, Validators.min(6), Validators.max(99)]],
          }),
          setTimeout(() => this.appService.setRequestStatus(false))
      ),
      err => (
        setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message))
    );
  }

  changeProfile() {
    this.appService.setRequestStatus(true);
    this.profileService.changeProfileData({...this.changeProfileForma.value, id: this.profileInfo.id})
      .subscribe(res => {
          this.profileInfo = {...this.profileInfo, ...this.changeProfileForma.value, id: this.profileInfo.id};
          this.appService.setRequestStatus(false);
        },
        err => {
          this.appService.setRequestStatus(false);
          alert(err.error.message);
        });
  }

  changePassword() {
    this.appService.setRequestStatus(true);
    this.profileService.changePassword({
      id: this.profileInfo.id,
      oldPassword: this.changePasswordForma.value.oldPassword,
      password: this.changePasswordForma.value.password,
    })
      .subscribe(res => {
          alert('Success. Check your email for confirm');
          this.appService.setRequestStatus(false);
        },
        err => {
          this.appService.setRequestStatus(false);
          alert(err.error.message);
        });
  }

  setStatusChangeForm(value: boolean) {
    this.statusChangeForm = value;
  }

  setStatusChangePasswordForm(value: boolean) {
    this.statusChangePasswordForm = value;
  }
}
