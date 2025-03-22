import { Component } from '@angular/core';
 import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { busesInterface } from 'src/app/interface/buses.interface';

@Component({
  selector: 'app-buses-edit',
  imports: [ ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './buses-edit.component.html',
  styleUrl: './buses-edit.component.scss'
})
export class BusesEditComponent {
  buses: busesInterface = {
    id: 1,
    plateNumber: "51A-12345",
    busTypeID: 1,
    driverId: 1,
    status: 'active',
    totalSeats: 40,
    seatsId: 1
  };

  plateNumber = new FormControl(this.buses.plateNumber, [Validators.required,  Validators.minLength(5)]);
  busTypeID = new FormControl(this.buses.busTypeID, Validators.required);
  driverId = new FormControl(this.buses.driverId, Validators.required);
  totalSeats = new FormControl(this.buses.totalSeats, [Validators.required, Validators.pattern('^[0-9]+$')]);
  status = new FormControl(this.buses.status); 
  seatsId = new FormControl(this.buses.seatsId, Validators.required);

  onSave() {
    Object.values({ plateNumber: this.plateNumber, busTypeID: this.busTypeID, driverId: this.driverId, totalSeats: this.totalSeats, seatsId: this.seatsId }).forEach(control => control.markAsTouched())
     return;
  }
}
