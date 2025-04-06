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
  
  Create(routesData: { startPoint: string; endPoint: string; distance: number; time: number }): Observable<routesInterface> {
    return this.post<routesInterface>(API_ENDPOINT.routes.base + API_ENDPOINT.routes.createRoutes, routesData);
  }

}