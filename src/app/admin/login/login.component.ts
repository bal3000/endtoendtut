import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { LoginForm } from '../model/loginform.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: LoginForm;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.form = new LoginForm();
  }

  login() {
    this.userService.login(this.form.email, this.form.password);
    this.userService.verifyUser();
  }

  signup() {
    this.router.navigate(['/admin/signup']);
  }

  cancel() {
    this.router.navigate(['']);
  }
}
