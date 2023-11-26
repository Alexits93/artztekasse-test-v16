import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  /**
   * 
   * @param request 
   * @param next 
   * @returns 
   * 
   * Just for demo purposes, does only logging
   * This interceptor would handle timeout, successful response, error and handle
   * request completed.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'This is just an example of an interceptor for demo purposes.';
        if (error.error instanceof ErrorEvent) {
          // for client-side errors
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // for server-side errors
          errorMessage = `ErrorCode: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        // using throwError, because "new Error()" only supports string
        return throwError(() => errorMessage);
      })
    );
  }
}
