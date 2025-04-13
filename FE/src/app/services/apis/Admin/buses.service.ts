import { busesInterface } from '../../../interface/buses.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT_AD } from '../../../config/api-endpoint-Admin.config';

@Injectable({
    providedIn: 'root'
})
export class BusesService extends ApiService {
    constructor(
        private _http: HttpClient
    ) {
        super(_http);
    }

    List(): Observable<busesInterface[]> {
        return this.get<busesInterface[]>(API_ENDPOINT_AD.buses.base + API_ENDPOINT_AD.buses.getList);
    }

}