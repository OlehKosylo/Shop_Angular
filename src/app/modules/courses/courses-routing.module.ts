import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContainerPageComponent} from './components/container-page/container-page.component';
import {CoursesContainerComponent} from './components/courses-container/courses-container.component';
import {CoursesContainerResolverService} from './services/resolvers/courses-container.resolver.service';
import {SearchCoursesContainerResolverService} from './services/resolvers/search-courses-container.resolver.service';
import {CourseComponent} from './components/course/course.component';
import {CourseResolverService} from './services/resolvers/course.resolver.service';


const routes: Routes = [
  {path: '', component: ContainerPageComponent},
  {path: 'list/:genre', component: CoursesContainerComponent, resolve: {coursesContainerResolver: CoursesContainerResolverService}},
  {
    path: 'list/:genre/:title/search',
    component: CoursesContainerComponent,
    resolve: {searchCoursesContainerResolverService: SearchCoursesContainerResolverService}
  },
  {
    path: 'list/:genre/:title', component: CourseComponent,
    resolve: {courseResolverService: CourseResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {
}
