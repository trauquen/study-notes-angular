import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-login',
  templateUrl: './reactive-login.component.html',
  styleUrls: ['./reactive-login.component.scss']
})
export class ReactiveLoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
    });

  constructor() {
  }

  ngOnInit(): void {
  }

  login(): void {
    const controls = this.loginForm.controls;
    console.log('User:' + controls.username.value);
    console.log('Password:' + controls.password.value);
    }

    get username(): AbstractControl {
      return this.loginForm.controls.username;
      }
      get password(): AbstractControl {
      return this.loginForm.controls.password;
      }
}
