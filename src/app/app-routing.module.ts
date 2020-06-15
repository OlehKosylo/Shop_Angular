import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ActivateMailComponent} from './components/activate-mail/activate-mail.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('src/app/modules/main/main.module').then(m => m.MainModule)},
  {path: 'activate', component: ActivateMailComponent},
  {path: 'registration', loadChildren: () => import('src/app/modules/registration/registration.module').then(m => m.RegistrationModule)},
  {path: 'forgot', loadChildren: () => import('src/app/modules/forgot/forgot-pass.module').then(f => f.ForgotPassModule)},
  {path: 'login', loadChildren: () => import('src/app/modules/login/login.module').then(l => l.LoginModule)}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}


