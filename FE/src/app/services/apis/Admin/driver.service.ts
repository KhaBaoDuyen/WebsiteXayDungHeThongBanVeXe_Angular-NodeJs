import { driveriInterface } from '../../../interface/driver.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT_AD } from '../../../config/api-endpoint-Admin.config';

@Injectable({
    providedIn: 'root'
})
export class DriverService extends ApiService {

    constructor(
        private _http: HttpClient
    ) {
        super(_http);
    }

    List(): Observable<driveriInterface[]> {
        return this.get<driveriInterface[]>(API_ENDPOINT_AD.drivers.base + API_ENDPOINT_AD.drivers.get);
    }

    Create(data: FormData): Observable<driveriInterface> {
        return this.post<driveriInterface>(
          API_ENDPOINT_AD.drivers.base + API_ENDPOINT_AD.drivers.create,
          data
        );
      }
    getById(id: number): Observable<driveriInterface> {
        return this.get<driveriInterface>(API_ENDPOINT_AD.drivers.base + API_ENDPOINT_AD.drivers.getById + '/' + id);
    }

    Update(id: number, routeData:any): Observable<driveriInterface> {
        return this.patch<driveriInterface>(API_ENDPOINT_AD.drivers.base + API_ENDPOINT_AD.drivers.update + '/' + id, routeData);
    }

    Delete(id: number): Observable<driveriInterface> {
        return this.delete(API_ENDPOINT_AD.drivers.base + API_ENDPOINT_AD.drivers.delete + '/' + id);
    }
      
      

}