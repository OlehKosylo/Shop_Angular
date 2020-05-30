import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfilePageComponent} from './components/profile-page/profile-page.component';
import {ProfilePageEditComponent} from './components/profile-page-edit/profile-page-edit.component';


const routes: Routes = [
  {path: '', component: ProfilePageComponent},
  {path: 'edit', component: ProfilePageEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilePageRoutingModule {
}
