import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './components/main/main.component';
import {PreViewGoodsComponent} from './components/pre-view-goods/pre-view-notebook.component';
import { LeftNavComponent } from './components/left-nav/left-nav.component';


@NgModule({
  declarations: [MainComponent, PreViewGoodsComponent, LeftNavComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  exports: []
})
export class MainModule {
}
