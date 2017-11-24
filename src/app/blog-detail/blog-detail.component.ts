import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { Blog } from '../admin/model/blog.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  public post: Blog;

  constructor(private router: Router, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    const postId = this.currentRoute.snapshot.params['id'];
    this.getPost(postId);
  }

  getPost(id: string) {
    const dbRef = firebase.database().ref('blogPosts/');
    dbRef
      .orderByChild('id')
      .equalTo(id)
      .once('value')
      .then((snapshot: firebase.database.DataSnapshot) => {
        const tmp: string[] = snapshot.val();
        this.post = Object.keys(tmp).map((key) => tmp[key] as Blog)[0];
      });
  }
}
