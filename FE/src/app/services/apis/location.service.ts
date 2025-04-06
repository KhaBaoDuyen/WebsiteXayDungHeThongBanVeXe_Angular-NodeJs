import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { catchError, Observable } from 'rxjs';
import { API_ENDPOINT } from '../../config/api-endpoint.config';

export interface Province {
    ProvinceID: number;
    ProvinceName: string;
    CountryID: number;
    Code: string;
}

export interface District {
    DistrictID: number;
    DistrictName: string;
    ProvinceID: number;
    Code: string;
}

export interface Ward {
    WardCode: string;
    WardName: string;
    DistrictID: number;
}


@Injectable({
    providedIn: 'root'
})
export class LocationService extends ApiService {
    constructor(private _http: HttpClient) {
        super(_http);
    }
    private apiUrl = 'http://localhost:3000/api/distance';

    getProvinces(): Observable<Province[]> {
        return this.get<Province[]>(API_ENDPOINT.apiRoutes.base + API_ENDPOINT.apiRoutes.getProvinces);
    }

    getDistricts(provinceID: number): Observable<District[]> {
        return this.get<District[]>(`${API_ENDPOINT.apiRoutes.base}${API_ENDPOINT.apiRoutes.getDistricts}?province_id=${provinceID}`);
    }


    getWards(districtID: number): Observable<Ward[]> {
        return this.get<Ward[]>(`${API_ENDPOINT.apiRoutes.base}${API_ENDPOINT.apiRoutes.getWards}?district_id=${districtID}`)

    }

    
}
