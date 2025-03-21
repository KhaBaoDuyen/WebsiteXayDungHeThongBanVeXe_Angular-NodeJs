import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-routes-create',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './routes-create.component.html',
  styleUrls: ['./routes-create.component.scss']
})
export class RoutesCreateComponent {
  routesForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.routesForm = this.fb.group({
      startPoint: ['', [Validators.required, Validators.minLength(3)]],
      endPoint: ['', [Validators.required, Validators.minLength(3)]],
      distance: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  get startPoint() { return this.routesForm.get('startPoint') as FormControl; }
  get endPoint() { return this.routesForm.get('endPoint') as FormControl; }
  get distance() { return this.routesForm.get('distance') as FormControl; }

  onSave() {
    this.routesForm.markAllAsTouched();

    if (this.routesForm.invalid) {
      return;
    }

    const routeData = {
      startPoint: this.startPoint.value,
      endPoint: this.endPoint.value,
      distance: this.distance.value
    };
  }
}