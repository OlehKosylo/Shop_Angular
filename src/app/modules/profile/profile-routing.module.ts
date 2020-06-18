import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {ProfileResolverService} from './services/resolvers/profile.resolver.service';


const routes: Routes = [
  {path: '', resolve: {profileResolverService: ProfileResolverService}, component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
