import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_ENDPOINT } from '../../../config/api-endpoint.config';
import { contactInterface } from 'src/app/interface/contact.Interface';

@Injectable({
    providedIn: 'root'
})
export class LoaderService  {
  
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
}