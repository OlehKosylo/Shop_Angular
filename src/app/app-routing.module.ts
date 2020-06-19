import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ActivateMailComponent} from './components/activate-mail/activate-mail.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {UserIsAdminGuardService} from './services/guards/user-is-admin-guard.service';

const routes: Routes = [
  {path: '', loadChildren: () => import('src/app/modules/main/main.module').then(m => m.MainModule)},
  {path: 'activate', component: ActivateMailComponent},
  {path: 'changePassword', component: ChangePasswordComponent},
  {path: 'registration', loadChildren: () => import('src/app/modules/registration/registration.module').then(m => m.RegistrationModule)},
  {path: 'forgot', loadChildren: () => import('src/app/modules/forgot/forgot-pass.module').then(f => f.ForgotPassModule)},
  {path: 'login', loadChildren: () => import('src/app/modules/login/login.module').then(l => l.LoginModule)},
  {path: 'profile', loadChildren: () => import('src/app/modules/profile/profile.module').then(p => p.ProfileModule)},
  {
    path: 'admin',
    canActivate: [UserIsAdminGuardService],
    loadChildren: () => import('src/app/modules/admin/admin.module').then(a => a.AdminModule)
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}


