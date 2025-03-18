import { Component } from '@angular/core';
import { busesInterface } from '../../../../interface/buses.interface';
@Component({
  selector: 'app-buses-edit',
  imports: [],
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
}
