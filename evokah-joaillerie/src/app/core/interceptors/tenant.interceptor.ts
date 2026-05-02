import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  if (environment.companyId) {
    const clonedReq = req.clone({
      headers: req.headers.set('x-company-id', environment.companyId)
    });
    return next(clonedReq);
  }
  return next(req);
};
