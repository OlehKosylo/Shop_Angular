import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PhoneContainerComponent} from './components/phone-container/phone-container.component';
import {PhonesResolverService} from './services/resolvers/phones.resolver.service';
import {PhoneResolverService} from './services/resolvers/phone.resolver.service';
import {PhoneComponent} from './components/phone/phone.component';


const routes: Routes = [
  {path: '', resolve: {phonesResolverService: PhonesResolverService}, component: PhoneContainerComponent},
  {path: ':id', resolve: {phoneResolverService: PhoneResolverService}, component: PhoneComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhonesRoutingModule {
}
