import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MapboxService {
  private token = 'pk.eyJ1IjoiYmFvZHV5ZW4xMjMiLCJhIjoiY205NWRnenRmMHh0ZDJpcjQ4a2Y2ZzRhaSJ9.w70EOHntFvOVf6uE2rIahQ'; 
  private geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  private directionsUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving';

  constructor(private http: HttpClient) {}

  getCoordinates(place: string) {
    const url = `${this.geocodeUrl}/${encodeURIComponent(place)}.json`;
    return this.http.get<any>(url, {
      params: {
        access_token: this.token,
        limit: 1,
        country: 'VN', 
        language: 'vi' 
      }
    }).pipe(
      map(res => {
        if (!res.features || res.features.length === 0) {
          throw new Error('Địa điểm không được tìm thấy');
        }
        return res.features[0].center;
      })
    );
  }

  getDistance(start: string, end: string) {
    return forkJoin([
      this.getCoordinates(start),
      this.getCoordinates(end)
    ]).pipe(
      switchMap(([startCoord, endCoord]) => {
        if (!startCoord || !endCoord) {
          throw new Error('Không thể xác định tọa độ');
        }
        const coordString = `${startCoord[0]},${startCoord[1]};${endCoord[0]},${endCoord[1]}`;
        return this.http.get<any>(`${this.directionsUrl}/${coordString}`, {
          params: {
            access_token: this.token,
            geometries: 'geojson',
            overview: 'full'
          }
        });
      }),
      map(res => {
        if (!res.routes || res.routes.length === 0) {
          throw new Error('Không thể tính toán tuyến đường');
        }
        const distanceMeters = res.routes[0].distance;  
        const durationSeconds = res.routes[0].duration; 
        
        const km = (distanceMeters / 1000).toFixed(2);  
        const hours = (durationSeconds / 3600).toFixed(2); 
        return {
          km: km,
          hours: hours
        };
      })
    );
  }
}
