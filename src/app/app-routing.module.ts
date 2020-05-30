import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPageResolverService} from './modules/main-page/services/resolvers/main-page.resolver.service';
import {ActivateMailComponent} from './components/activate-mail/activate-mail.component';


const routes: Routes = [
  {path: 'activate', component: ActivateMailComponent},
  {path: 'registration', loadChildren: () => import('src/app/modules/registration/registration.module').then(m => m.RegistrationModule)},
  {path: 'login', loadChildren: () => import('src/app/modules/login/login.module').then(l => l.LoginModule)},
  {
    path: 'main', loadChildren: () => import('src/app/modules/main-page/main-page.module').then(m => m.MainPageModule),
    resolve: {mainPageResolverService: MainPageResolverService}
  },
  {
    path: 'courses', loadChildren: () => import('src/app/modules/courses/courses.module').then(c => c.CoursesModule),
  },
  {path: 'forgot', loadChildren: () => import('src/app/modules/forgot/forgot-pass.module').then(f => f.ForgotPassModule)},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}


