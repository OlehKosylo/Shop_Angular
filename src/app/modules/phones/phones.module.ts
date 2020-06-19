import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonesRoutingModule } from './phones-routing.module';
import { PhoneComponent } from './components/phone/phone.component';
import { PhoneContainerComponent } from './components/phone-container/phone-container.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PreViewPhoneComponent} from './components/pre-view-phone/pre-view-phone.component';
import * as firebase from 'firebase';
import {environment} from '../../../environments/environment';
firebase.initializeApp(environment.firebaseConfig);


@NgModule({
  declarations: [PhoneComponent, PhoneContainerComponent, PreViewPhoneComponent],
  imports: [
    CommonModule,
    PhonesRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class PhonesModule { }
