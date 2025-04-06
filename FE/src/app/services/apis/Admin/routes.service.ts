import { routesInterface } from '../../../interface/routes.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../../config/api-endpoint.config';

@Injectable({
    providedIn: 'root'
})
export class RoutesService extends ApiService {

    constructor(
        private _http: HttpClient
    ) {
        super(_http);
    }

    List(): Observable<routesInterface[]> {
        return this.get<routesInterface[]>(API_ENDPOINT.routes.base + API_ENDPOINT.routes.getRoutes);
    }

    Create(routesData: {
        startPoint: string;
        endPoint: string;
        distance: number;
        time: number;
        startProvinceID: number;
        startDistrictID: number;
        startWardID: number;
        endProvinceID: number;
        endDistrictID: number;
        endWardID: number;
    }): Observable<routesInterface> {
        return this.post<routesInterface>(API_ENDPOINT.routes.base + API_ENDPOINT.routes.createRoutes, routesData);
    }

    getRoutesById(id: number): Observable<routesInterface> {
        return this.get<routesInterface>(API_ENDPOINT.routes.base + API_ENDPOINT.routes.getRoutesById + '/' + id);
    }

    Update(id: number, routeData:any): Observable<routesInterface> {
        return this.patch<routesInterface>(API_ENDPOINT.routes.base + API_ENDPOINT.routes.updateRoutes + '/' + id, routeData);
    }

    Delete(id: number): Observable<routesInterface> {
        return this.delete(API_ENDPOINT.routes.base + API_ENDPOINT.routes.deleteRoutes + '/' + id);
    }
      
      

}