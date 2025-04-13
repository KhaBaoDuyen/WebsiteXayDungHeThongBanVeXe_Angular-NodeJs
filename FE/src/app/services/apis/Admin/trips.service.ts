import { busRouteInterface } from '../../../interface/bus-route.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT_AD } from '../../../config/api-endpoint-Admin.config';

@Injectable({
    providedIn: 'root'
})
export class TripsService extends ApiService {
    constructor(
        private _http: HttpClient
    ) {
        super(_http);
    }

    List(): Observable<busRouteInterface[]> {
        return this.get<busRouteInterface[]>(API_ENDPOINT_AD.trips.base + API_ENDPOINT_AD.trips.getList);
    }

    Create(busrouteData: {
        routeId: number;
        departureTime: string;
        arrivalTime: string;
        price: number;
        status: string;
        busID: number;
        driverId: number;
    }): Observable<busRouteInterface> {
        return this.post<busRouteInterface>(API_ENDPOINT_AD.trips.base + API_ENDPOINT_AD.trips.create, busrouteData);
    }

    getById(id: number): Observable<busRouteInterface> {
        return this.get<busRouteInterface>(API_ENDPOINT_AD.trips.base + API_ENDPOINT_AD.trips.getById + '/' + id);
    }

    Update(id: number, busrouteData: any): Observable<busRouteInterface> {
        return this.patch<busRouteInterface>(API_ENDPOINT_AD.trips.base + API_ENDPOINT_AD.trips.update + '/' + id, busrouteData);
    }

    Delete(id: number): Observable<busRouteInterface> {
        return this.delete(API_ENDPOINT_AD.trips.base + '/' + id) as Observable<busRouteInterface>;
    }
    
    

}