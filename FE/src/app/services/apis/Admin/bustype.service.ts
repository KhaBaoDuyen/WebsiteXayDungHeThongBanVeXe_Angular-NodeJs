import { BusTypeInterface } from '../../../interface/bus-type.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT_AD } from '../../../config/api-endpoint-Admin.config';

@Injectable({
    providedIn: 'root'
})
export class BusTypeService extends ApiService {
    constructor(
        private _http: HttpClient
    ) {
        super(_http);
    }

    List(): Observable<BusTypeInterface[]> {
        return this.get<BusTypeInterface[]>(API_ENDPOINT_AD.bustype.base + API_ENDPOINT_AD.bustype.getList);
    }

    Create(busesData: any): Observable<BusTypeInterface> {
        return this.post<BusTypeInterface>(API_ENDPOINT_AD.bustype.base + API_ENDPOINT_AD.bustype.create, busesData);
    }

    getById(id: number): Observable<BusTypeInterface> {
        return this.get<BusTypeInterface>(API_ENDPOINT_AD.bustype.base + API_ENDPOINT_AD.bustype.getById + '/' + id);
    }

    Update(id: number, routeData: any): Observable<BusTypeInterface> {
        return this.patch<BusTypeInterface>(API_ENDPOINT_AD.bustype.base + API_ENDPOINT_AD.bustype.update + '/' + id, routeData);
    }

    Delete(id: number): Observable<BusTypeInterface> {
        return this.delete(API_ENDPOINT_AD.bustype.base + API_ENDPOINT_AD.bustype.delete + '/' + id);
    }

}