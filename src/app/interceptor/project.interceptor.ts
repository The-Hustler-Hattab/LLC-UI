import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LoadingSpinnerServiceService } from '../services/loading-spinner-service.service';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
@Injectable()
export class ProjectInterceptor implements HttpInterceptor {
  constructor(private loadingSpinner: LoadingSpinnerServiceService,
  private router : Router,
   @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {
 }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingSpinner.show()
    console.log('Request is on its way');
    
    return this.handleAccess(req, next);
  }

  private handleAccess(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.oktaAuth.getAccessToken();
    // console.log(accessToken);
    if ( accessToken == null || accessToken == undefined || accessToken == '') {
      this.router.navigate(['/']);
    }
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken
      }
    });

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        // Handle successful responses here
        if (event instanceof HttpResponse) {
          this.loadingSpinner.hide()
        }
      }),
      catchError((error) => {
        this.loadingSpinner.hide()

        // Handle errors here
        if (error instanceof HttpErrorResponse && (error.status == 500 || error.status == 401)) {
          console.error('HTTP error:', error);
          // this.router.navigate(['/error'], {queryParams: {error: error.message}} )

        }
        return throwError(error); // Re-throw the error to propagate it
      }),
      
    )

    
  }
  
}

