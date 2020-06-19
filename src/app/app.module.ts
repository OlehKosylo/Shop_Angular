import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/app/app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ActivateMailComponent} from './components/activate-mail/activate-mail.component';
import {Interceptor} from './interceptor.interceptor';
import {CommonModule} from '@angular/common';
import {PhonesResolverService} from './modules/phones/services/resolvers/phones.resolver.service';
import {PhoneResolverService} from './modules/phones/services/resolvers/phone.resolver.service';
import {FormBuilder} from '@angular/forms';
import {NotebookResolverService} from './modules/notebooks/services/resolvers/notebook.resolver.service';
import {NotebooksResolverService} from './modules/notebooks/services/resolvers/notebooks.resolver.service';
import {TvsResolverService} from './modules/tv/services/resolvers/tvs.resolver.service';
import {TvResolverService} from './modules/tv/services/resolvers/tv.resolver.service';
import {GoodsResolverService} from './modules/main/services/resolvers/goods.resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    ActivateMailComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    FormBuilder,
    PhonesResolverService, PhoneResolverService,
    NotebookResolverService, NotebooksResolverService,
    TvsResolverService, TvResolverService,
    GoodsResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
