import { Component } from '@angular/core';
import { BusTypeInterface } from 'src/app/interface/bus-type.interface';

@Component({
  selector: 'app-bustype-edit',
  imports: [],
  templateUrl: './bustype-edit.component.html',
  styleUrl: './bustype-edit.component.scss'
})
export class BustypeEditComponent {
  bustype: BusTypeInterface = {
    id: 1,
    name: "Xe Buýt Thành Phố", 
    status: "active"
  };
}
