import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT_AD } from 'src/app/config/api-endpoint-Admin.config';
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

    List(): Observable<contactInterface[]> {
        return this.get<contactInterface[]>(API_ENDPOINT_AD.contact.base + API_ENDPOINT_AD.contact.getList);
    }

   
    getById(id: number): Observable<contactInterface> {
        return this.get<contactInterface>(API_ENDPOINT_AD.contact.base + API_ENDPOINT_AD.contact.getById + '/' + id);
    }

    Update(id: number, data:any): Observable<contactInterface> {
        return this.patch<contactInterface>(API_ENDPOINT_AD.contact.base + API_ENDPOINT_AD.contact.update + '/' + id, data);
    }

    Delete(id: number): Observable<contactInterface> {
        return this.delete(API_ENDPOINT_AD.contact.base + '/' + id);
    }
      
      

}