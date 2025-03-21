import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { driveriInterface } from '../../../../interface/driver.interface';

@Component({
  selector: 'app-driver-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.scss'],
  standalone: true
})
export class DriverEditComponent implements OnInit {
  driverForm: FormGroup;
  selectedFile: File | null = null;

  driver: driveriInterface = {
    id: 1,
    fullName: 'Nguyễn Văn A',
    phone: '0987654321',
    licenseNumber: '123456789',
    experienceYears: 5,
    birthDate: new Date('1990-01-01'),
    status: 'active',
    createdAt: '2023-01-01',
    age: 33,
    image: 'user-7.jpg',
  };

  constructor(private fb: FormBuilder) {

    this.driverForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      licenseNumber: ['', [Validators.required, Validators.minLength(10)]],
      experienceYears: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      birthDate: [null, [Validators.required, this.dateTodayValidator()]],
      status: ['active']
    });
  }

  ngOnInit() {
    this.driverForm.patchValue({
      fullName: this.driver.fullName,
      phone: this.driver.phone,
      licenseNumber: this.driver.licenseNumber,
      experienceYears: this.driver.experienceYears,
      birthDate: this.driver.birthDate.toISOString().substring(0, 10), 
      status: this.driver.status
    });
  }

  dateTodayValidator() {
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
      this.driver.image = this.selectedFile.name;  
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


  }
}