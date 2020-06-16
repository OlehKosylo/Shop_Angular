import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvsRoutingModule } from './tvs-routing.module';
import { TvComponent } from './components/tv/tv.component';
import { TvContainerComponent } from './components/tv-container/tv-container.component';
import { PreViewTvComponent } from './components/pre-view-tv/pre-view-tv.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [TvComponent, TvContainerComponent, PreViewTvComponent],
  imports: [
    CommonModule,
    TvsRoutingModule,
    ReactiveFormsModule
  ],
  exports: [],
})
export class TvsModule { }
