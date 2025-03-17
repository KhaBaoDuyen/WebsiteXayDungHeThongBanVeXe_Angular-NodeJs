import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-driver-create',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './driver-create.component.html',
  styleUrls: ['./driver-create.component.scss']
})
export class DriverCreateComponent {
  driverForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.driverForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      licenseNumber: ['', Validators.required],
      experienceYears: [null, [Validators.required, Validators.min(1)]],
      birthDate: ['', Validators.required],
      status: ['active', Validators.required],
      image: [null]
    });
  }


}
