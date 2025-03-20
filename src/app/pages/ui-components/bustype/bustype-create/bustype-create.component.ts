import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bustype-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './bustype-create.component.html',
  styleUrl: './bustype-create.component.scss'
})
export class BustypeCreateComponent {
  name = new FormControl('', [Validators.required, Validators.minLength(5)]);
  status = new FormControl('active');

  onSave() {
    const controls = { name: this.name };
    Object.values(controls).forEach(control =>  control.markAsTouched());

    if (this.name.invalid) {
      return;
    }

    console.log('Form Submitted!', { name: this.name.value, status: this.status.value });
  }
}
