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
    let storageRef = firebase.storage().ref();
    storageRef.child(`images/${post.imgTitle}`).putString(post.img, 'base64')
      .then((snapshot) => {
        let url = snapshot.metadata.downloadURLs[0];
        let dbRef = this.getFirebaseDb();
        let newPost = dbRef.push();
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
