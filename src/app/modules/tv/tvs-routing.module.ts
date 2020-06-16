import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TvContainerComponent} from './components/tv-container/tv-container.component';
import {TvsResolverService} from './services/resolvers/tvs.resolver.service';
import {TvResolverService} from './services/resolvers/tv.resolver.service';
import {TvComponent} from './components/tv/tv.component';


const routes: Routes = [
  {path: '', resolve: {tvsResolverService: TvsResolverService}, component: TvContainerComponent},
  {path: ':id', resolve: {tvResolverService: TvResolverService}, component: TvComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvsRoutingModule {
}
