import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {PhoneContainerComponent} from '../phones/components/phone-container/phone-container.component';
import {PhonesResolverService} from '../phones/services/resolvers/phones.resolver.service';


const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
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
