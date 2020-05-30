import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './components/main-page/main-page.component';
import {UserInGuardService} from '../../services/guards/user-in-guard.service';
import {ProfilePageResolverService} from '../profile-page/services/resolvers/profile-page.resolver.service';
import {CreateCourseComponent} from './components/create-course/create-course.component';
import {MyCoursesComponent} from './components/my-courses/my-courses.component';
import {MyCoursesResolverService} from './services/resolvers/my-courses.resolver.service';
import {MyCourseComponent} from './components/my-course/my-course.component';
import {MyCourseResolverService} from './services/resolvers/my-course.resolver.service';
import {ActivatedCardGuardService} from '../../services/guards/activated-card-guard.service';


const routes: Routes = [
  {
    path: '', component: MainPageComponent, children: [
      {
        path: 'profile', loadChildren: () => import('src/app/modules/profile-page/profile-page.module').then(p => p.ProfilePageModule),
        canActivate: [UserInGuardService], resolve: {profilePageResolverService: ProfilePageResolverService}
      },
      {
        path: 'create', component: CreateCourseComponent, canActivate: [UserInGuardService, ActivatedCardGuardService]
      },
      {
        path: 'my-courses', component: MyCoursesComponent, resolve: {myCoursesResolverService: MyCoursesResolverService}
      },
      {
        path: 'my-courses/:title', component: MyCourseComponent, resolve: {myCourseResolverService: MyCourseResolverService}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {
}
