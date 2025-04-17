import { routesInterface } from 'src/app/interface/routes.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../../config/api-endpoint.config';

@Injectable({
    providedIn: 'root'
})
export class HomeService extends ApiService {
    tripsData: any = null;
    searchParams: any = null;
  
    constructor(
        private _http: HttpClient
    ) {
        super(_http);
    }

    List(): Observable<routesInterface> {
        return this.get<routesInterface>(API_ENDPOINT.home.base + API_ENDPOINT.home.getOption);
    }
 
    Search(data:any): Observable<any>{ 
        return this.post<routesInterface>(API_ENDPOINT.home.base + API_ENDPOINT.home.search,data );
    }

    TimeTable(): Observable<routesInterface> {
        return this.get<routesInterface>(API_ENDPOINT.timeTable.base + API_ENDPOINT.timeTable.get);
    }

}