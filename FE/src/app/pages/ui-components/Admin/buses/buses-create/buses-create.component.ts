import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-buses-create',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './buses-create.component.html',
  styleUrl: './buses-create.component.scss'
})
export class BusesCreateComponent {

  plateNumber = new FormControl('', [Validators.required,  Validators.minLength(5)]);
  busTypeID = new FormControl('', Validators.required);
  driverId = new FormControl('', Validators.required);
  totalSeats = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  seatsId = new FormControl('',  Validators.required);
  status = new FormControl('',  Validators.required); 

  onSave() {
    const controls = { plateNumber: this.plateNumber, busTypeID: this.busTypeID, driverId: this.driverId, totalSeats: this.totalSeats, seatsId: this.seatsId, status: this.status };
    Object.values(controls).forEach(control =>  control.markAsTouched());
      return;
    }
}
