import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routesInterface } from '../../../../interface/routes.interface';

@Component({
  selector: 'app-routes-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './routes-edit.component.html',
  styleUrl: './routes-edit.component.scss'
})
export class RoutesEditComponent {
  routes: routesInterface = {
    id: 1,
    startPoint: "Hà Nội",
    endPoint: "Hồ Chí Minh",
    distance: 2000
  };

  startPoint = new FormControl(this.routes.startPoint, [Validators.required, Validators.minLength(3)]);
  endPoint = new FormControl(this.routes.endPoint, [Validators.required, Validators.minLength(3)]);
  distance = new FormControl(this.routes.distance, [Validators.required, Validators.pattern("^[0-9]*$")]);

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
