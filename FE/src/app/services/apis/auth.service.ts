import { userInterface } from './../../interface/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  constructor(
    private _http: HttpClient
  ) {
    super(_http);
  }
  
  Register(userData: { fullName: string, phone:string, email: string, password: string, }): Observable<userInterface> {
    return this.post<userInterface>(API_ENDPOINT.auth.base + API_ENDPOINT.auth.register, userData);
  }
  Login(login: { email: string, password: string }): Observable<userInterface> {
    return this.post<userInterface>(
      API_ENDPOINT.auth.base + API_ENDPOINT.auth.login, 
      login
    );
  }
}
