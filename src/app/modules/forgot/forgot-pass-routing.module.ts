import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecoverPasswordComponent} from './components/recover-password/recover-password.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';


const routes: Routes = [
  {path: '', component: ForgotPasswordComponent},
  {path: 'token', component: RecoverPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPassRoutingModule { }
