import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageRoutingModule} from './main-page-routing.module';
import {MainPageComponent} from './components/main-page/main-page.component';
import {CreateCourseComponent} from './components/create-course/create-course.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyCoursesComponent} from './components/my-courses/my-courses.component';
import {MyCourseComponent} from './components/my-course/my-course.component';
import {MatVideoModule} from 'mat-video';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';


@NgModule({
  declarations: [MainPageComponent, CreateCourseComponent, MyCoursesComponent, MyCourseComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    ReactiveFormsModule,
    MatVideoModule,
    FormsModule,
    RxReactiveFormsModule
  ]
})
export class MainPageModule {
}
