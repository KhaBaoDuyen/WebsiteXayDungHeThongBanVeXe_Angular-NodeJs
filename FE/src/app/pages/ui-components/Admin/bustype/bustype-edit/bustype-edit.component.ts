import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BusTypeInterface } from 'src/app/interface/bus-type.interface';

@Component({
  selector: 'app-bustype-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  
  templateUrl: './bustype-edit.component.html',
  styleUrl: './bustype-edit.component.scss'
})
export class BustypeEditComponent {
  bustype: BusTypeInterface = {
    id: 1,
    name: "Xe Buýt Thành Phố",
    status: "active"
  };

  name = new FormControl(this.bustype.name, [Validators.required, Validators.minLength(5)]);
  status = new FormControl(this.bustype.status);

  onSave() {
    Object.values({ name: this.name, status: this.status }).forEach(control => control.markAsTouched())
     return;
  }
}
