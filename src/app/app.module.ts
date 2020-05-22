import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/app/app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MainPageResolverService} from './modules/main-page/services/resolvers/main-page.resolver.service';
import {TokenInterceptor} from './TokenInterceptor.interceptor';
import {ProfilePageResolverService} from './modules/profile-page/services/resolvers/profile-page.resolver.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MyCoursesResolverService} from './modules/main-page/services/resolvers/my-courses.resolver.service';
import {MyCourseResolverService} from './modules/main-page/services/resolvers/my-course.resolver.service';
import { ActivateMailComponent } from './components/activate-mail/activate-mail.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivateMailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FlexLayoutModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    MainPageResolverService, ProfilePageResolverService,
    MyCoursesResolverService, MyCourseResolverService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
