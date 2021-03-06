import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminComponent } from './admin/admin.component';
import { BlogAdminComponent } from './blog-admin/blog-admin.component';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';

import { UserService } from './services/user.service';
import { BlogAdminService } from './services/blog-admin.service';
import { ProductAdminService } from './services/product-admin.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule
  ],
  providers: [UserService, BlogAdminService, ProductAdminService],
  declarations: [
    SignUpComponent,
    LoginComponent,
    AdminMenuComponent,
    AdminComponent,
    BlogAdminComponent,
    BlogAddComponent,
    ProductAdminComponent
  ]
})
export class AdminModule { }
