import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-buses-create',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './buses-create.component.html',
  styleUrl: './buses-create.component.scss'
})
export class BusesCreateComponent {
  driverForm: FormGroup;
  selectedFile: File | null = null;

}
