import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { BlogAdminComponent } from './blog-admin/blog-admin.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';

import { UserService } from './services/user.service';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'blog-admin', component: BlogAdminComponent, canActivate: [UserService] },
      { path: 'product-admin', component: ProductAdminComponent, canActivate: [UserService] },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: '', component: AdminMenuComponent, canActivate: [UserService] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
