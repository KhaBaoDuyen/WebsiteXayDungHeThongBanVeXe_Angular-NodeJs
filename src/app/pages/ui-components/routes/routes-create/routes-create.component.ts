import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-routes-create',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './routes-create.component.html',
  styleUrl: './routes-create.component.scss'
})
export class RoutesCreateComponent {
driverForm: FormGroup;
  selectedFile: File | null = null;


}
