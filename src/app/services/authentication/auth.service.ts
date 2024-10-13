import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OKTA_AUTH,  OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth
  , public authService: OktaAuthStateService) {

    this.isUserLoggedIn();

  }



    // Method to check if the user belongs to the "Administrator" group
    checkIfAdmin() {
      try {
        this.authService.authState$
        .pipe(
          map((authState) => authState?.isAuthenticated 
          && authState?.accessToken?.claims['user-role']) 
        )
        .subscribe((userRoles) => {
          if (userRoles instanceof Array) {
            this.isAdmin = userRoles.includes('llc-admins');
          }else{
            this.isAdmin = false;
          }
          // console.log("Is Admin: ", this.isAdmin);
          // console.log("authState: ", this.authService.authState$);
  
        });
      } catch (error) {
        console.error('Error checking if user is an admin:', error);
        this.isAdmin= false;
      }
    }
    isUserLoggedIn(): boolean {

      this.authService.authState$.subscribe((authState) => {
        this.isLoggedIn = authState?.isAuthenticated;
      });
      return this.isLoggedIn;
    }

    login(){
      this.oktaAuth.signInWithRedirect();
      console.log("logged in");
    }

  
    logout(){
      this.oktaAuth.signOut();
      console.log("logged out");
    }
}
