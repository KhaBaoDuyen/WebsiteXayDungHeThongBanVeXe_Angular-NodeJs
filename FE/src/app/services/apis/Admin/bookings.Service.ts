import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT_AD } from 'src/app/config/api-endpoint-Admin.config';
import { bookingInterface } from 'src/app/interface/booking.interface';

@Injectable({
    providedIn: 'root'
})
export class BookingsService extends ApiService {

    constructor(
        private _http: HttpClient
    ) {
        super(_http);
    }

    // Lấy danh sách tất cả bookings
    List(): Observable<bookingInterface[]> {
        return this.get<bookingInterface[]>(API_ENDPOINT_AD.bookings.base + API_ENDPOINT_AD.bookings.list);
    }
    // Lấy danh sách tất cả bookings có status canceled 
    ListCanceled(): Observable<bookingInterface[]> {
        return this.get<bookingInterface[]>(API_ENDPOINT_AD.bookings.base + API_ENDPOINT_AD.bookings.ListCanceled);
    }
    // Lấy danh sách tất cả bookings có status confirmed
    ListConfirmed(): Observable<bookingInterface[]> {
        return this.get<bookingInterface[]>(API_ENDPOINT_AD.bookings.base + API_ENDPOINT_AD.bookings.ListConfirmed);
    }
    // Lấy booking theo ID
    getById(id: number): Observable<bookingInterface> {
        return this.get<bookingInterface>(API_ENDPOINT_AD.bookings.base + API_ENDPOINT_AD.bookings.getById + '/' + id);
    }

    // Cập nhật booking
    Update(id: number, data: any): Observable<bookingInterface> {
        return this.patch<bookingInterface>(API_ENDPOINT_AD.bookings.base + API_ENDPOINT_AD.bookings.update + '/' + id, data);
    }

    // Xóa booking
    Delete(id: number): Observable<bookingInterface> {
        return this.delete(API_ENDPOINT_AD.bookings.base + '/' + id);
    }
}
