import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bus-create',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './bus-create.component.html',
  styleUrl: './bus-create.component.scss'
})
export class BusCreateComponent {
  driverForm: FormGroup;
  selectedFile: File | null = null;
}
