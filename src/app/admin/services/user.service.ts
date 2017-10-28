import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import * as firebase from 'firebase';

import { User } from '../model/user.model';
import { AuthUser } from '../model/authuser.model';

@Injectable()
export class UserService implements CanActivate {

  public userLoggedIn: Boolean = false;
  public loggedInUser: User;
  public authUser: any;

  constructor(private router: Router) {
    firebase.initializeApp({
      apiKey: 'AIzaSyAOUa56W_pzedMGPOTSlYCMmPCMgfXJ97o',
      authDomain: 'tut-project-848f7.firebaseapp.com',
      databaseURL: 'https://tut-project-848f7.firebaseio.com',
      projectId: 'tut-project-848f7',
      storageBucket: 'tut-project-848f7.appspot.com',
      messagingSenderId: '718640497619'
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.verifyLogin(url);
  }

  verifyLogin(url: string): boolean {
    if (this.userLoggedIn) {
      return true;
    }

    this.router.navigate(['/admin/login']);
    return false;
  }

  register(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(`${error.message} Please Try Again!`);
      });
  }

  verifyUser() {
    this.authUser = firebase.auth().currentUser;

    if (this.authUser) {
      console.log(`Welcome ${this.authUser.email}`);
      this.loggedInUser = new User(this.authUser.email, this.authUser.displayName);
      this.userLoggedIn = true;
      this.router.navigate(['/admin']);
    }
  }

  login(loginEmail: string, loginPassword: string) {
    firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
      .catch((error) => {
        console.log(`${error.message} Unable to login. Try Again!`);
      });
  }

  logout() {
    this.userLoggedIn = false;
    firebase.auth().signOut().then(() => {
      console.log('Logged Out!');
      this.loggedInUser = null;
    }, (error) => {
      console.log(`${error.message} Unable to logout. Try Again!`);
    });
  }
}
