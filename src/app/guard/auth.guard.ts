import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OKTA_AUTH,  OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AuthService } from '../services/authentication/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  isUserLoggedIn: boolean = null;

  canActivate(): boolean {
    if (this.isUserLoggedIn == null) {
      this.isUserLoggedIn = this.auth.isUserLoggedIn();
      
    }

    if (this.isUserLoggedIn) {
      return true;
      
    }else{
      this.router.navigate(['home']);
      return false;
    }
  }

  
}