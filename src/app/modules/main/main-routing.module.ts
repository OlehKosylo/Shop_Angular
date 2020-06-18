import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {GoodsResolverService} from './services/resolvers/goods.resolver.service';
import {LeftNavComponent} from './components/left-nav/left-nav.component';


const routes: Routes = [
  {
    path: '', resolve: {goodsResolverService: GoodsResolverService}, component: LeftNavComponent, children: [
      {path: '', component: MainComponent},
      {path: 'phones', loadChildren: () => import('src/app/modules/phones/phones.module').then(p => p.PhonesModule)},
      {path: 'notebooks', loadChildren: () => import('src/app/modules/notebooks/notebooks.module').then(n => n.NotebooksModule)},
      {path: 'tv', loadChildren: () => import('src/app/modules/tv/tvs.module').then(t => t.TvsModule)},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
