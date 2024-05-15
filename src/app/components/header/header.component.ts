import { Component, Inject } from '@angular/core';
import { OKTA_AUTH,  OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    @Inject(OKTA_AUTH) public oktaAuth: OktaAuth, public authService: OktaAuthStateService,  ) {}


    login(){

      this.oktaAuth.signInWithRedirect();
      console.log("logged in");
  
  
    }
  
    logout(){
      this.oktaAuth.signOut();
      console.log("logged out");
  
    }




}
