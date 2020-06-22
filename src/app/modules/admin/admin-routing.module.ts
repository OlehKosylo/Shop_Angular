import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './components/admin/admin.component';
import {CreatePhoneComponent} from './components/create-phone/create-phone.component';
import {CreateNotebookComponent} from './components/create-notebooks/create-notebook.component';
import {CreateTvComponent} from './components/create-tv/create-tv.component';
import {OrderContainerComponent} from './components/order-container/order-container.component';
import {AllOrdersResolverService} from './services/resolvers/allOrders.resolver.service';
import {CompletedOrdersResolverService} from './services/resolvers/completedOrders.resolver.service';
import {DoesntDoneOrdersResolverService} from './services/resolvers/doesntDoneOrders.resolver.service';


const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path: 'phone', component: CreatePhoneComponent},
      {path: 'notebook', component: CreateNotebookComponent},
      {path: 'tv', component: CreateTvComponent},
      {path: 'allOrders', resolve: {allOrdersResolverService: AllOrdersResolverService}, component: OrderContainerComponent},
      {
        path: 'completedOrders',
        resolve: {completedOrdersResolverService: CompletedOrdersResolverService},
        component: OrderContainerComponent
      },
      {
        path: 'doesntDoneOrders',
        resolve: {doesntDoneOrdersResolverService: DoesntDoneOrdersResolverService},
        component: OrderContainerComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
