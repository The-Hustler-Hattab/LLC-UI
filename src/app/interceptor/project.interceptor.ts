import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LoadingSpinnerServiceService } from '../services/loading-spinner-service.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {
  constructor(private loadingSpinner: LoadingSpinnerServiceService,
  private router : Router) {
 }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingSpinner.show()
    console.log('Request is on its way');
    
    return this.handleAccess(req, next);
  }

  private handleAccess(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

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

