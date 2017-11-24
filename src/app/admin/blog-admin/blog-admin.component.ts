import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { UserService } from '../services/user.service';
import { BlogAdminService } from '../services/blog-admin.service';

import { Blog } from '../model/blog.model';
import { User } from '../model/user.model';

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.css']
})
export class BlogAdminComponent implements OnInit {

  public theUser: User;
  public menuChoice: string;
  public blogPosts: Blog[];
  public formDisplay: boolean;
  public singlePost: Blog;

  constructor(
    private userService: UserService,
    private blogService: BlogAdminService,
    private router: Router
  ) {
    this.formDisplay = true;
  }

  ngOnInit() {
    this.theUser = this.userService.loggedInUser;
    this.getPosts();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

  chooseMode(mode: string) {
    this.menuChoice = mode;
  }

  getPosts() {
    const dbRef = this.blogService.getFirebaseDb();
    dbRef.once('value')
      .then((snapshot: firebase.database.DataSnapshot) => {
        const tmp: string[] = snapshot.val();
        this.blogPosts = Object.keys(tmp).map((key) => tmp[key]);
      }).catch((error) => {
        console.log(error);
      });
  }

  editPost(thePost: Blog) {
    this.singlePost = thePost;
    this.formDisplay = false;
  }

  cancelEdit() {
    this.singlePost = null;
    this.formDisplay = true;
  }

  updatePost(thePost: Blog) {
    this.blogService.editPost(thePost);
    this.formDisplay = true;
  }

  deletePost(thePost: Blog) {
    const verify = confirm('Are you sure you want to delete this post?');
    if (verify) {
      this.blogService.removePost(thePost);
      this.router.navigate(['/admin/']);
    } else {
      alert('Nothing deleted!');
    }
  }
}
