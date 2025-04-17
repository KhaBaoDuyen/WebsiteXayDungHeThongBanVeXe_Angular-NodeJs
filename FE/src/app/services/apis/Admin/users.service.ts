import { userInterface } from '../../../interface/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT_AD } from '../../../config/api-endpoint-Admin.config';

@Injectable({
    providedIn: 'root'
})
export class UsersService extends ApiService {
    constructor(
        private _http: HttpClient
    ) {
        super(_http);
    }

    List(): Observable<userInterface[]> {
        return this.get<userInterface[]>(API_ENDPOINT_AD.users.base + API_ENDPOINT_AD.users.getList);
    }

    Create(formData: FormData): Observable<userInterface> {
        return this.post<userInterface>(API_ENDPOINT_AD.users.base + API_ENDPOINT_AD.users.create, formData);
    }


    getById(id: number): Observable<userInterface> {
        return this.get<userInterface>(API_ENDPOINT_AD.users.base + API_ENDPOINT_AD.users.getById + '/' + id);
    }

    Update(id: number, userData: any): Observable<userInterface> {
        return this.patch<userInterface>(API_ENDPOINT_AD.users.base + API_ENDPOINT_AD.users.update + '/' + id, userData);
    }
    Delete(id: number): Observable<userInterface> {
        return this.delete(API_ENDPOINT_AD.users.base + '/' + id) as Observable<userInterface>;
    }

}