import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as firebase from 'firebase';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { CreatePhoneComponent } from './components/create-phone/create-phone.component';
import {ReactiveFormsModule} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {CreateNotebookComponent} from './components/create-notebooks/create-notebook.component';
import {CreateTvComponent} from './components/create-tv/create-tv.component';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [AdminComponent, CreatePhoneComponent, CreateNotebookComponent, CreateTvComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
