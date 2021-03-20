import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthenticationService, private router: Router) { }

canActivate() {
    return this.canLoad()
}

canLoad() {
    if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/']);
    }
    return this.authService.isLoggedIn();
  }
}
