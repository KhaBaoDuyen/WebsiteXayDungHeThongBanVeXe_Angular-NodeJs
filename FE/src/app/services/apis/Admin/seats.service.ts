import { seatsInterface } from '../../../interface/seatsInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT_AD } from '../../../config/api-endpoint-Admin.config';

@Injectable({
    providedIn: 'root'
})
export class SeatsService extends ApiService {
    constructor(
        private _http: HttpClient
    ) {
        super(_http);
    }

    List(id: number): Observable<seatsInterface[]> {
        return this.get<seatsInterface[]>(API_ENDPOINT_AD.seats.base + '/' + id);
    }

    Update(id: number, routeData:any): Observable<seatsInterface> {
        return this.put<seatsInterface>(API_ENDPOINT_AD.seats.base + '/' + id, routeData);
    }

}