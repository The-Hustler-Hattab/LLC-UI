import { Component, Inject } from '@angular/core';
import { OKTA_AUTH,  OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/authentication/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {



  constructor(
    private auth: AuthService ) {

      this.auth.checkIfAdmin();
    }


    login(){

      this.auth.login();
  
  
    }
  
    logout(){
      this.auth.logout();
  
    }

    isAuthenticated(): boolean {
      return this.auth.isLoggedIn;
    }
 

 

  // Can be used directly in the template
  isAdministrator(): boolean {
    return this.auth.isAdmin;
  }

}
