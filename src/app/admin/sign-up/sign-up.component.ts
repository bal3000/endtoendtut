import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { SignUpForm } from '../model/signupform.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: SignUpForm;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.form = new SignUpForm();
  }

  signUp() {
    if (this.form.password !== this.form.passwordVerify) {
      this.form.passwordFail = true;
    }
    else {
      this.form.passwordFail = false;
      this.userService.register(this.form.email, this.form.password);
      this.userService.verifyUser();
    }
  }

  cancel() {
    this.router.navigate(['/admin/login']);
  }
}
