import { routesInterface } from '../../../interface/routes.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT_AD } from '../../../config/api-endpoint-Admin.config';

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
        return this.get<routesInterface[]>(API_ENDPOINT_AD.routes.base + API_ENDPOINT_AD.routes.getRoutes);
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
        return this.post<routesInterface>(API_ENDPOINT_AD.routes.base + API_ENDPOINT_AD.routes.createRoutes, routesData);
    }

    getRoutesById(id: number): Observable<routesInterface> {
        return this.get<routesInterface>(API_ENDPOINT_AD.routes.base + API_ENDPOINT_AD.routes.getRoutesById + '/' + id);
    }

    Update(id: number, routeData:any): Observable<routesInterface> {
        return this.patch<routesInterface>(API_ENDPOINT_AD.routes.base + API_ENDPOINT_AD.routes.updateRoutes + '/' + id, routeData);
    }

    Delete(id: number): Observable<routesInterface> {
        return this.delete(API_ENDPOINT_AD.routes.base + API_ENDPOINT_AD.routes.deleteRoutes + '/' + id);
    }
      
      

}