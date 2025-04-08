import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../../config/api-endpoint.config';
import { contactInterface } from 'src/app/interface/contact.Interface';

@Injectable({
    providedIn: 'root'
})
export class ContactService extends ApiService {

    constructor(
        private _http: HttpClient
    ) {
        super(_http);
    }

    Create(data: any): Observable<contactInterface> {
        return this.post<contactInterface>(API_ENDPOINT.contact.base + API_ENDPOINT.contact.question, data);
      }
 

}