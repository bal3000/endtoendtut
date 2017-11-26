import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { UserService } from '../services/user.service';
import { ProductAdminService } from '../services/product-admin.service';

import { Product } from '../model/product.model';
import { User } from '../model/user.model';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {
  public theUser: User;
  public menuChoice: string;
  public productPosts: Product[];
  public selectedProduct: Product;

  constructor(private productService: ProductAdminService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.theUser = this.userService.loggedInUser;
    this.getProducts();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

  chooseMode(mode: string) {
    this.menuChoice = mode;
  }

  async getProducts() {
    this.productPosts = await this.productService.getAllProducts();
  }

  editProduct(product: Product) {
    this.selectedProduct = product;
  }

  cancelEdit() {
    this.selectedProduct = null;
  }

  updateProduct() {
    if (this.selectedProduct && this.selectedProduct !== null) {
      this.productService.editProduct(this.selectedProduct);
      this.cancelEdit();
    }
  }

  deleteProduct(product: Product) {
    const verify = confirm('Are you sure you want to delete this product?');
    if (verify) {
      this.productService.removeProduct(product);
      this.router.navigate(['/admin/']);
    } else {
      alert('Nothing deleted!');
    }
  }
}
