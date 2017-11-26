import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { Product } from '../model/product.model';

@Injectable()
export class ProductAdminService {

  constructor() { }

  getFirebaseDb(): firebase.database.Reference {
    return firebase.database().ref('products/');
  }

  getFirebaseStorage(imgTitle: string): firebase.storage.Reference {
    return firebase.storage().ref().child(`product_images/${imgTitle}`);
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const dbRef = this.getFirebaseDb();
      const snapshot: firebase.database.DataSnapshot = await dbRef.once('value');
      const tmp: string[] = snapshot.val();
      if (tmp && tmp !== null) {
        return Object.keys(tmp).map((key) => tmp[key] as Product);
      }
      return [];
    } catch (error) {
      console.log(error);
    }
  }

  createProduct(product: Product) {
    const storageRef = this.getFirebaseStorage(product.imgTitle);
    storageRef.putString(product.img, 'base64')
      .then((snapshot) => {
        const url = snapshot.metadata.downloadURLs[0];
        const dbRef = this.getFirebaseDb();
        const newProduct = dbRef.push();
        product.id = newProduct.key;
        product.img = url;
        newProduct.set(product);
      })
      .catch((error) => {
        console.log(`failed upload: ${error}`);
      });
  }

  editProduct(product: Product) {
    const dbRef = this.getFirebaseDb().child(product.id);
    if (dbRef) {
      dbRef.update({
        name: product.name,
        description: product.description,
        price: product.price
      });
      alert('product updated');
    } else {
      alert('product does not exist');
    }
  }

  removeProduct(product: Product) {
    const dbRef = this.getFirebaseDb().child(product.id);
    if (dbRef) {
      dbRef.remove();
      const storageRef = this.getFirebaseStorage(product.imgTitle);
      if (storageRef) {
        storageRef
          .delete()
          .then(() => console.log(`${product.imgTitle} was deleted from storage`))
          .catch((error) => console.log('Error occured', error));
      }
      alert('product deleted');
    } else {
      alert('product does not exist');
    }
  }
}
