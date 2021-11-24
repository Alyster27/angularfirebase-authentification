import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable, ResolvedReflectiveFactory } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _angularfireAuth: AngularFireAuth
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return new Promise((resolve, reject) => {
      this._angularfireAuth.onAuthStateChanged((user) => {
        if (user) {
          resolve(true);
        } else {
          console.log('Auth Guard: user is not logged in');
          this._router.navigate(['/home']);
          resolve(false);
        }
      })
    })
  }
  
}
