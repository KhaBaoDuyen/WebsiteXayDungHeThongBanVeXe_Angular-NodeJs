import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bus-create',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './bus-create.component.html',
  styleUrl: './bus-create.component.scss'
})
export class BusCreateComponent {
  route = new FormControl('', [Validators.required,  Validators.minLength(5)]);
  departure = new FormControl('', Validators.required);
  arrival = new FormControl('', Validators.required);
  price = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  status = new FormControl('', Validators.required); 

  onSave() {
    const controls = { route: this.route, departure: this.departure, arrival: this.arrival, price: this.price, status: this.status };
    Object.values(controls).forEach(control =>  control.markAsTouched());
      return;
    }
}
