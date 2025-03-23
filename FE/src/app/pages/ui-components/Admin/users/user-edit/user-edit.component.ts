import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { userInterface } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Thêm ReactiveFormsModule
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
  users: userInterface = {
    id: 1,
    fullName: 'Nguyễn Văn A',
    phone: '0987654321',
    status: 'active',
    image: 'user-7.jpg',
    email: 'NguyenVanA@gmail.com',
    role: 'User'
  };

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      fullName: [this.users.fullName, [Validators.required, Validators.minLength(3)]],
      phone: [this.users.phone, [Validators.required, Validators.pattern(/^0\d{9}$/)]],
      email: [this.users.email, [Validators.required, Validators.email]],
      role: [this.users.role, Validators.required],
      status: [this.users.status, Validators.required],
      image: [this.users.image],
    });
  }

  get fullName() { return this.userForm.get('fullName'); }
  get phone() { return this.userForm.get('phone'); }
  get email() { return this.userForm.get('email'); }
  get role() { return this.userForm.get('role'); }
  get status() { return this.userForm.get('status'); }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    console.log('Dữ liệu hợp lệ:', this.userForm.value);
  }
}
