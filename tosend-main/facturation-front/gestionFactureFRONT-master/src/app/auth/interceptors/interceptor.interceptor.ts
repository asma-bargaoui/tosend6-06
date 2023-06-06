import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request.url);
    
    let token = localStorage.getItem("jwt")
    let newReq = request.clone({
      setHeaders: {
        Authorization: ""+ token
      }
    })
    
    
    return next.handle(newReq);
  }
}
