import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { Blog } from '../model/blog.model';

@Injectable()
export class BlogAdminService {

  constructor() { }

  getFirebaseDb(): firebase.database.Reference {
    return firebase.database().ref('blogPosts/');
  }

  getFirebaseStorage(): firebase.storage.Reference {
    return firebase.storage().ref();
  }

  createPost(post: Blog) {
    const storageRef = this.getFirebaseStorage();
    storageRef.child(`images/${post.imgTitle}`).putString(post.img, 'base64')
      .then((snapshot) => {
        const url = snapshot.metadata.downloadURLs[0];
        const dbRef = this.getFirebaseDb();
        const newPost = dbRef.push();
        newPost.set({
          title: post.title,
          content: post.content,
          imgTitle: post.imgTitle,
          img: url,
          id: newPost.key
        });
      })
      .catch((error) => {
        console.log(`failed upload: ${error}`);
      });
  }

  editPost(update: Blog) {
    const dbRef = this.getFirebaseDb().child(update.id);
    if (dbRef) {
      dbRef.update({
        title: update.title,
        content: update.content
      });
      alert('post updated');
    } else {
      alert('post does not exist');
    }
  }

  removePost(deletePost: Blog) {
    const dbRef = this.getFirebaseDb().child(deletePost.id);
    if (dbRef) {
      dbRef.remove();
      const imgRef = this.getFirebaseStorage().child(`images/${deletePost.imgTitle}`);
      if (imgRef) {
        imgRef
          .delete()
          .then(() => console.log(`${deletePost.imgTitle} was deleted from storage`))
          .catch((error) => console.log('Error occured', error));
      }
      alert('post deleted');
    } else {
      alert('post does not exist');
    }
  }
}
