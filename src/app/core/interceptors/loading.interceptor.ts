import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (
      request.method === 'POST' ||
      request.method === 'DELETE'
      )
    {
      return next.handle(request);
    }

    this.busyService.busy();

    return next.handle(request).pipe(
      //identity mean do nothing
      delay(1000),
      finalize(() => this.busyService.idle())
    );
  }
}
