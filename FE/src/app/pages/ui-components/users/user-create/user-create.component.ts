import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class UserCreateComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.pattern(/^0[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['User', Validators.required],
      status: ['active', Validators.required]
    });
  }

  onSave() {
    if (this.userForm.valid) {
      console.log('Dữ liệu gửi đi:', this.userForm.value);
    } else {
      console.log('Form không hợp lệ!');
      this.userForm.markAllAsTouched(); // Đánh dấu tất cả các field để hiển thị lỗi
    }
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('File đã chọn:', file.name);
    }
  }
}
