import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPassRoutingModule } from './forgot-pass-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecoverPasswordComponent} from './components/recover-password/recover-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


@NgModule({
  declarations: [RecoverPasswordComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPassRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ForgotPassModule { }
