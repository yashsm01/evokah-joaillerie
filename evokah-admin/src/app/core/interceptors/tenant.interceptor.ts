import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  // Evokah standard company ID from environment
  private companyId = environment.companyId;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Only intercept requests to our API
    if (request.url.startsWith(environment.apiUrl)) {
      const cloned = request.clone({
        setHeaders: {
          'x-company-id': this.companyId
        }
      });
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
