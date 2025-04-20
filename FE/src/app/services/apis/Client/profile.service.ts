import { userInterface } from '../../../interface/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT_AD } from '../../../config/api-endpoint-Admin.config';

@Injectable({
    providedIn: 'root'
})
export class ProfileService extends ApiService {
    constructor(
        private _http: HttpClient
    ) {
        super(_http);
    }

    getById(id: number): Observable<userInterface> {
        return this.get<userInterface>(API_ENDPOINT_AD.profile.base + API_ENDPOINT_AD.profile.getById + '/' + id);
    }

    Update(id: number, userData: any): Observable<userInterface> {
        return this.patch<userInterface>(API_ENDPOINT_AD.profile.base + API_ENDPOINT_AD.profile.update + '/' + id, userData);
    }

}