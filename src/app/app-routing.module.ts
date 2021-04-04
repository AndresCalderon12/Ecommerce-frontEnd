import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './admin/products/products.component';
import { UsersComponent } from './admin/users/users.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { CartComponent } from './tienda/cart/cart.component';
import { TiendaProductosComponent } from './tienda/tienda-productos.component';

const routes: Routes = [
  { path: 'admin/users', component: UsersComponent },
  { path: 'admin/products', component: ProductsComponent },
  { path: 'shop', component: TiendaProductosComponent },
  { path: 'shop/cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGaurdService] },
  


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
