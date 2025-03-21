import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { routesInterface } from '../../../../interface/routes.interface';

@Component({
  selector: 'app-routes-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './routes-edit.component.html',
  styleUrls: ['./routes-edit.component.scss']
})
export class RoutesEditComponent implements OnInit {
  routesForm: FormGroup;

  routes: routesInterface = {
    id: 1,
    startPoint: "Hà Nội",
    endPoint: "Hồ Chí Minh",
    distance: 2000
  };

  constructor(private fb: FormBuilder) {
    this.routesForm = this.fb.group({
      startPoint: ['', [Validators.required, Validators.minLength(5)]],
      endPoint: ['', [Validators.required, Validators.minLength(5)]],
      distance: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit() {
    this.routesForm.patchValue({
      startPoint: this.routes.startPoint,
      endPoint: this.routes.endPoint,
      distance: this.routes.distance.toString()
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

    const updatedRoute = {
      ...this.routes,
      startPoint: this.startPoint.value,
      endPoint: this.endPoint.value,
      distance: parseInt(this.distance.value, 10)
    };
  }
}