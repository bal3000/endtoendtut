import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { Blog } from '../model/blog.model';

@Injectable()
export class BlogAdminService {

  constructor() { }

  getFirebaseDb(): firebase.database.Reference {
    return firebase.database().ref('blogPosts/');
  }

  createPost(post: Blog) {
    const storageRef = firebase.storage().ref();
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

}
