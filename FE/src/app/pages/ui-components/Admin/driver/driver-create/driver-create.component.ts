import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-driver-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './driver-create.component.html',
  styleUrls: ['./driver-create.component.scss'],
  standalone: true
})
export class DriverCreateComponent {
  driverForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.driverForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      experienceYears: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      licenseNumber: ['', [Validators.required, Validators.minLength(10)]],
      birthDate: [null, [Validators.required, this.dateLessThanTodayValidator()]],
      status: ['active']
    });
  }

  dateLessThanTodayValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today ? { futureDate: true } : null;
    };
  }

  get fullName() { return this.driverForm.get('fullName') as FormControl; }
  get phone() { return this.driverForm.get('phone') as FormControl; }
  get experienceYears() { return this.driverForm.get('experienceYears') as FormControl; }
  get licenseNumber() { return this.driverForm.get('licenseNumber') as FormControl; }
  get birthDate() { return this.driverForm.get('birthDate') as FormControl; }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  calculateAge(): number | string {
    if (!this.birthDate.value) return '';
    const birthDate = new Date(this.birthDate.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  onSave() {
    this.driverForm.markAllAsTouched();

    if (this.driverForm.invalid) {
      return;
    }

    const driverData = { ...this.driverForm.value, image: this.selectedFile };
  }
}