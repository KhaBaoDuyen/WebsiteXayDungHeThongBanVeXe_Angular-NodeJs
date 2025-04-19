import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../../config/api-endpoint.config';
import { bookingInterface } from 'src/app/interface/booking.interface';
@Injectable({
    providedIn: 'root'
})
export class BookingService extends ApiService {

    constructor(
        private _http: HttpClient
    ) {
        super(_http);
    }

    Create(data: any): Observable<bookingInterface> {
        return this.post<bookingInterface>(API_ENDPOINT.booking.base + API_ENDPOINT.booking.create, data);
      }
 

}