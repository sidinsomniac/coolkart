import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProductsComponent } from '../products/products.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { OrderSuccessComponent } from '../order-success/order-success.component';
import { MyOrdersComponent } from '../my-orders/my-orders.component';
import { AdminProductsComponent } from '../admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from '../admin/admin-orders/admin-orders.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent,
  HomeComponent,
  ProductsComponent,
  ShoppingCartComponent,
  CheckoutComponent,
  OrderSuccessComponent,
  MyOrdersComponent,
  AdminProductsComponent,
  AdminOrdersComponent
];