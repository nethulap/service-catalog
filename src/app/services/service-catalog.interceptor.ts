import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ServiceCatalogInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (/^\/api/.test(req.url)) {
      let token = document.getElementsByTagName("app-root")[0].getAttribute("token");
      let changedReq;
      if (typeof token !== 'undefined' && token !== '') {
        changedReq = req.clone({headers: req.headers.set('X-UserToken', token )});
      } else { changedReq = req; }
      return next.handle(changedReq);
    } else {
      return next.handle(req);
    }
  }
}
