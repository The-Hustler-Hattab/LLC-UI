import { Component, Inject } from '@angular/core';
import { OKTA_AUTH,  OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { map } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isAdmin: boolean = false;


  constructor(
    @Inject(OKTA_AUTH) public oktaAuth: OktaAuth, public authService: OktaAuthStateService,  ) {

      this.checkIfAdmin();
    }


    login(){

      this.oktaAuth.signInWithRedirect();
      console.log("logged in");
  
  
    }
  
    logout(){
      this.oktaAuth.signOut();
      console.log("logged out");
  
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
        console.log("Is Admin: ", this.isAdmin);
        console.log("authState: ", this.authService.authState$);

      });
    } catch (error) {
      console.error('Error checking if user is an admin:', error);
      this.isAdmin= false;
    }

  }

  // Can be used directly in the template
  isAdministrator(): boolean {
    return this.isAdmin;
  }

}
