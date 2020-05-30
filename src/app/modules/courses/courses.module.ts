import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoursesRoutingModule} from './courses-routing.module';
import {CourseComponent} from './components/course/course.component';
import {ContainerPageComponent} from './components/container-page/container-page.component';
import {CoursesContainerComponent} from './components/courses-container/courses-container.component';
import {CoursesContainerResolverService} from './services/resolvers/courses-container.resolver.service';
import {NgxStripeModule} from 'ngx-stripe';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BankCardComponent} from '../Stripe/components/bank-card/bank-card.component';
import {CardModule} from 'ngx-card';
import {SearchCoursesContainerResolverService} from './services/resolvers/search-courses-container.resolver.service';
import { PreViewCoursesComponent } from './components/pre-view-courses/pre-view-courses.component';
import {CourseResolverService} from './services/resolvers/course.resolver.service';

@NgModule({
  declarations: [CourseComponent, ContainerPageComponent, CoursesContainerComponent, BankCardComponent, PreViewCoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    NgxStripeModule.forRoot('pk_test_uwJfMaTLb0OKVoNrSXIkaHZm00KU712Vlv'),
    ReactiveFormsModule,
    CardModule,
    FormsModule,
  ],
  providers: [CoursesContainerResolverService, SearchCoursesContainerResolverService,
    CourseResolverService, FormBuilder]
})
export class CoursesModule {
}
