import { Component } from '@angular/core';
import { BusRoute } from '../../../../interface/bus-route.interface';

@Component({
  selector: 'app-bus-edit',
  imports: [],
  templateUrl: './bus-edit.component.html',
  styleUrl: './bus-edit.component.scss'
})
export class BusEditComponent {
busRoute: BusRoute = {
    id: 1, 
    route: 'TP.HCM - Hà Nội', 
    departure: '06:00', 
    arrival: '18:00', 
    price: 500000, 
    status: 'Đang chạy'
  };
}
