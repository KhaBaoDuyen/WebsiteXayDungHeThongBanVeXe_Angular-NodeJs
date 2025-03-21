import { Component } from '@angular/core';
import { BusRoute } from '../../../../interface/bus-route.interface';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bus-edit',
  imports: [ ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './bus-edit.component.html',
  styleUrl: './bus-edit.component.scss'
})
export class BusEditComponent {
busRoute: BusRoute = {
    id: 1, 
    route: 'TP.HCM - Hà Nội', 
    departure: '2024-03-22T06:00', 
    arrival: '2024-03-22T18:00', 
    price: 500000, 
    status: 'Đang chạy'
  };

  route = new FormControl(this.busRoute.route, [Validators.required,  Validators.minLength(5)]);
  departure = new FormControl(this.busRoute.departure, Validators.required);
  arrival = new FormControl(this.busRoute.arrival, Validators.required);
  price = new FormControl(this.busRoute.price, [Validators.required, Validators.pattern('^[0-9]+$')]);
  status = new FormControl(this.busRoute.status); 

  onSave() {
    Object.values({ route: this.route, departure: this.departure, arrival: this.arrival, price: this.price }).forEach(control => control.markAsTouched())
     return;
  }
}
