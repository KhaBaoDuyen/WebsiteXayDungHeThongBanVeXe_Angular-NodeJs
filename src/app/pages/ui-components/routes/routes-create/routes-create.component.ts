import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-routes-create',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule,],
  templateUrl: './routes-create.component.html',
  styleUrl: './routes-create.component.scss'
})
export class RoutesCreateComponent {

  startPoint = new FormControl('', [Validators.required, Validators.minLength(3)]);
  endPoint = new FormControl('', [Validators.required, Validators.minLength(3)]);
  distance = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]);

  onSave() {
    const controls = {
      startPoint: this.startPoint,
      endPoint: this.endPoint,
      distance: this.distance,
    };
    Object.values(controls).forEach(control => control.markAsTouched());
    return;
  }
}

