import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: any = FormGroup;
  firebaseErrorMessage: string;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _angularfireAuth: AngularFireAuth
  ) { 
    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'displayName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    })
  }

  signup() {
    if (this.signupForm.invalid)
    //console.log('signupForm complete --> ', this.signupForm);    
      return;
      
    this._authService.signupUser(this.signupForm.value).then((result) => {
      if (result == null)
        this._router.navigate(['/dashboard']);
      else if (result.isValid == false)
        this.firebaseErrorMessage = result.message;
    }).catch(() => {

    });
  }

}
