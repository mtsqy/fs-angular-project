import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Router } from '@angular/router'
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { tap, map, switchMap, catchError } from 'rxjs/operators'
import { AuthActionTypes, LogIn, LogInFailure, LogInSuccess } from 'actions'
import { AuthenticationService } from 'src/app/core/services'

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private router: Router
    ) {}

    login$ = createEffect(
        ():Observable<any> => {
        return this.actions$.pipe(
            ofType(AuthActionTypes.LOGIN),
            map((action: LogIn) => action.payload),
            switchMap(payload => {
                return this.authService.login(payload.email, payload.password)
                .pipe(
                    map((user) => {
                        return new LogInSuccess({
                            token: user.token, 
                            email: payload.email
                        }),
                        catchError(err => of (new LogInFailure({error: err})))
                    })
                )
            })
        )
    })

    loginSuccess$ = createEffect(
        ():Observable<any> => {
            return this.actions$.pipe(
                ofType(AuthActionTypes.LOGIN_SUCCESS),
                tap(user => {
                    localStorage.setItem('token', user.payload.token)
                    this.router.navigateByUrl('/employee')
                })
            )
        }
    )

    loginFailure$ = createEffect(
        ():Observable<any> => {
        return this.actions$.pipe(
            ofType(AuthActionTypes.LOGIN_FAILURE)
        )
    })
}
