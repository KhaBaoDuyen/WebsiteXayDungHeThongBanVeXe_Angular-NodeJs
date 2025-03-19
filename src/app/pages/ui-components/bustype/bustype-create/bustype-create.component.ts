import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bustype-create',
  imports: [],
  templateUrl: './bustype-create.component.html',
  styleUrl: './bustype-create.component.scss'
})
export class BustypeCreateComponent {
  driverForm: FormGroup;
  selectedFile: File | null = null;
}
