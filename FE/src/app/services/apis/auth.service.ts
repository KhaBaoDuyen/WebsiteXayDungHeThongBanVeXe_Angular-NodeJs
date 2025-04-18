import { API_BASE_URL } from './../../config/api-endpoint-Admin.config';
import { ResetPasswordComponent } from './../../pages/authentication/reset-password/reset-password.component';
import { userInterface } from './../../interface/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../config/api-endpoint.config';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  // static isLoggedIn() {
  //   throw new Error('Method not implemented.');
  // }
  public jwtHelperService = new JwtHelperService();
  private loginInfo!: userInterface;
  // static isLoggedIn() {
  //   throw new Error('Method not implemented.');
  // }

  constructor(
    private _http: HttpClient
  ) {
    super(_http);
  }

  Register(userData: { fullName: string, phone: string, email: string, password: string, }): Observable<userInterface> {
    return this.post<userInterface>(API_ENDPOINT.auth.base + API_ENDPOINT.auth.register, userData);
  }
  Login(login: { email: string, password: string }): Observable<userInterface> {
    return this.post<userInterface>(
      API_ENDPOINT.auth.base + API_ENDPOINT.auth.login,
      login
    );
  }

  ResetPassword(userData: { email: string }): Observable<userInterface> {
    return this.post<userInterface>(
      API_ENDPOINT.auth.base + API_ENDPOINT.auth.resetPassword,
      userData
    );
  }
  resetNewPassword(data: { id: string, token: string, password: string }): Observable<any> {
    return this.patch(
      `${API_ENDPOINT.auth.base}${API_ENDPOINT.auth.resetNewPassword}/${data.token}`,
      { password: data.password }
    );
  }

  getIdLogin() {
    if (this.loginInfo) {
      return this.loginInfo.email;
    }
    return null;
  }

  isTokenExpired(token: string): boolean {
    const expired = this.jwtHelperService.isTokenExpired(token);
    const decoded = this.jwtHelperService.decodeToken(token);
    
    if (expired || decoded?.status === 0) {
      localStorage.clear();
      return true;
    }
    return false;

  }


  // isLoggedIn(): boolean {
  //   if (this.getToken()) {
  //     const expired = this.jwtHelperService.isTokenExpired(this.getToken());
  //     if (expired) {
  //       localStorage.clear();
  //     }
  //     return !expired;
  //   }
  //   return false;
  // }
  
  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const decoded = this.jwtHelperService.decodeToken(token);
    return decoded?.role === 'admin';
  }

  override getToken() {
    return localStorage.getItem('auth_token');
  }

}
