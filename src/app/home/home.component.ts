import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserService } from '../admin/services/user.service';
import { Blog } from '../admin/model/blog.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public blogPosts: Blog[];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    const dbRef = firebase.database().ref('blogPosts/');
    dbRef.once('value')
      .then((snapshot) => {
        const tmp: string[] = snapshot.val();
        this.blogPosts = Object.keys(tmp).map((key) => tmp[key]);
      }).catch((error) => {
        console.log(error);
      });
  }

  selectPost(post: Blog) {
    this.router.navigate(['/post', post.id]);
  }
}
