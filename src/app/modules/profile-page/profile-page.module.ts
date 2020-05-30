import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfilePageRoutingModule} from './profile-page-routing.module';
import {ProfilePageComponent} from './components/profile-page/profile-page.component';
import {ProfilePageEditComponent} from './components/profile-page-edit/profile-page-edit.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardModule} from 'ngx-card';


@NgModule({
  declarations: [ProfilePageComponent, ProfilePageEditComponent],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    CardModule,
    FormsModule
  ],
  providers: [FormBuilder]
})
export class ProfilePageModule {
}
