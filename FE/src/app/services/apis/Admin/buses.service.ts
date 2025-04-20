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

    Create(busesData: {
        plateNumber: string;
        busTypeId: number;
        status: 'active' | 'inactive';
    }): Observable<busesInterface> {
        return this.post<busesInterface>(API_ENDPOINT_AD.buses.base + API_ENDPOINT_AD.buses.create, busesData);
    }


    getById(id: number): Observable<busesInterface> {
        return this.get<busesInterface>(API_ENDPOINT_AD.buses.base + API_ENDPOINT_AD.buses.getById + '/' + id);
    }

    Update(id: number, busesData: any): Observable<busesInterface> {
        return this.patch<busesInterface>(API_ENDPOINT_AD.buses.base + API_ENDPOINT_AD.buses.update + '/' + id, busesData);
    }
    Delete(id: number): Observable<busesInterface> {
        return this.delete(API_ENDPOINT_AD.buses.base + API_ENDPOINT_AD.buses.delete + '/' + id) as Observable<busesInterface>;
    }

    getAllByStatusCreate(): Observable<busesInterface[]> {
        return this.get<busesInterface[]>(API_ENDPOINT_AD.buses.base + API_ENDPOINT_AD.buses.getByStatusCreate);
    }

    getAllByStatusEdit(id: number): Observable<busesInterface[]> {
        return this.get<busesInterface[]>(API_ENDPOINT_AD.buses.base + API_ENDPOINT_AD.buses.getByStatusEdit + '/' + id);
    }

}