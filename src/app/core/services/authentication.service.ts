import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment'
import { User, Tokens } from 'models';
import { HttpClient } from '@angular/common/http';
import { catchError, mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private BASE_URL = environment.BASE_URL;

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  
  private loggedUser: string;

  constructor(
    private http: HttpClient
  ) { }

  getToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private storeToken(tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  refreshToken() {
    return this.http.post<any>(`${this.BASE_URL}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  private storeJwtToken (token: string) {
    localStorage.setItem(this.JWT_TOKEN, token)
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<User>(`${this.BASE_URL}/login`, {email, password})
    .pipe(
      tap(tokens => this.processLogin(email, tokens)),
      mapTo(true),
      catchError(err => {
        console.error(err)
        return of(false)
      })
    )
  }

  private processLogin(email, tokens) {
    this.loggedUser = email
    this.storeToken(tokens)
  }

  logout() {
    return this.http.post<any>(`${this.BASE_URL}/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.processLogout()),
      mapTo(true),
      catchError(err => {
        console.error(err.error);
        return of(false);
      }));
  }

  private processLogout() {
    this.loggedUser = null;
    this.removeTokens();
  }
  
  signup(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/register`, {email, password})
    .pipe(
      tap(res => console.log(res)),
      mapTo(true),
      catchError(err => {
        console.error( err.error);
        return of()
      })
    )
  }
}

