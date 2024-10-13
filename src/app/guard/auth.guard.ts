import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}


  canActivate(): boolean {
    if (this.auth.isUserLoggedIn()) {
      return true;
      
    }else{
      this.router.navigate(['home']);
      return false;
    }
  }

  
}