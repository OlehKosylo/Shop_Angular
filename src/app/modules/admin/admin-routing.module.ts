import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './components/admin/admin.component';
import {CreatePhoneComponent} from './components/create-phone/create-phone.component';
import {CreateNotebookComponent} from './components/create-notebooks/create-notebook.component';
import {CreateTvComponent} from './components/create-tv/create-tv.component';


const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path: 'phone', component: CreatePhoneComponent},
      {path: 'notebook', component: CreateNotebookComponent},
      {path: 'tv', component: CreateTvComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
