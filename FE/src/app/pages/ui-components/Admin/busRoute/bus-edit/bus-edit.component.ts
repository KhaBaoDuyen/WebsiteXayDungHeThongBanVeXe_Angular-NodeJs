import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BusRoute } from 'src/app/interface/bus-route.interface';

@Component({
  selector: 'app-bus-edit',
  imports: [ ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './bus-edit.component.html',
})
export class BusEditComponent {
busRoute: BusRoute = {
    id: 1, 
    route: 1, 
    departure: '2024-03-22T06:00', 
    arrival: '2024-03-22T18:00', 
    price: 500000, 
    status: "inactive",
    busID: 1,
    driverID: 2,
  };

  route = new FormControl(this.busRoute.route);
  departure = new FormControl(this.busRoute.departure, Validators.required);
  arrival = new FormControl(this.busRoute.arrival, Validators.required);
  price = new FormControl(this.busRoute.price, [Validators.required, Validators.pattern('^[0-9]+$')]);
  status = new FormControl(this.busRoute.status); 
  busID = new FormControl(this.busRoute.busID); 
  driverID = new FormControl(this.busRoute.driverID); 

  onSave() {
    Object.values({ 
      route: this.route, 
      departure: this.departure, 
      arrival: this.arrival, 
      price: this.price,
      status: this.status,
      busID: this.busID,
      driverID: this.driverID,
    }).forEach(control => control.markAsTouched())
     return;
  }
}
