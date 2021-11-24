import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _angularFireAuth: AngularFireAuth
  ) { 
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });

    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
  }

  loginUser() {
    if (this.loginForm.invalid)
      return;

    this._authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
      if (result == null) {
        console.log('logging in...');
        this._router.navigate(['/dashboard']);
      } else if (result.isValid == false) {
        console.log('login error', result);
        this.firebaseErrorMessage = result.message;
      }
    });
  }
}
