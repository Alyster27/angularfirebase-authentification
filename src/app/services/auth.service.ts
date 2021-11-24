import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: boolean;

  constructor(
    private _router: Router,
    private _angularFireAuth: AngularFireAuth
  ) { 
    this.userLoggedIn = false;

    this._angularFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  signupUser(user: any): Promise<any> {
    return this._angularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();
        result.user?.sendEmailVerification();
      })
      .catch(error => {
        console.log('Auth Service: signup error', error);
        if (error.code)
          return { isValid: false, message: error.message };
          else {return}
      });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this._angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
      })
      .catch(error => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code)
          return { isValid: false, message: error.message }
          else {return};
      });
  }

}
