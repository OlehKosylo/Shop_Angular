import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './components/admin/admin.component';
import {CreatePhoneComponent} from './components/create-phone/create-phone.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateNotebookComponent} from './components/create-notebooks/create-notebook.component';
import {CreateTvComponent} from './components/create-tv/create-tv.component';
import {OrderComponent} from './components/order/order.component';
import {OrderContainerComponent} from './components/order-container/order-container.component';
import {AllOrdersResolverService} from './services/resolvers/allOrders.resolver.service';
import {CompletedOrdersResolverService} from './services/resolvers/completedOrders.resolver.service';
import {DoesntDoneOrdersResolverService} from './services/resolvers/doesntDoneOrders.resolver.service';

@NgModule({
  declarations: [AdminComponent, CreatePhoneComponent, CreateNotebookComponent, CreateTvComponent, OrderComponent, OrderContainerComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AllOrdersResolverService, CompletedOrdersResolverService, DoesntDoneOrdersResolverService]
})
export class AdminModule {
}
