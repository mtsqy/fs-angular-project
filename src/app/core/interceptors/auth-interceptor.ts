import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, catchError, switchMap, take, filter } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services';

@Injectable()
export class AuthHeadersInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        public authService: AuthenticationService
    ) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        if (this.authService.getToken()) {
            authReq = this.addToken(req, this.authService.getToken())
        }
        return next.handle(authReq)
        .pipe(
            tap(
                (incoming: any) => { incoming },
                (error: HttpErrorResponse) => {
                    console.error(error);
                    return of(error);
                }
            ),
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    switch(err.status) {
                        case 401:
                            return
                        default:
                            console.error(err);
                    }
                }
                return of(err);
            })
        );
    }

    private addToken(req: HttpRequest<any>, token: string) {
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authService.getToken()}`
            }
        })
    }

    private errorHandler401(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            return this.authService.refreshToken()
            .pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.jwt);
                    return next.handle(this.addToken(req, token.jwt))
                })
            )
        } else {
            return this.refreshTokenSubject
            .pipe(
                filter(token => token != null),
                take(1),
                switchMap((jwt: string) => {
                    return next.handle(this.addToken(req, jwt))
                })
            )
        }
    }
}