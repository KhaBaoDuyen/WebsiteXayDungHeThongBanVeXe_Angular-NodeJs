import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UsersService } from '../../../../../services/apis/Admin/users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class UserCreateComponent {
  form: FormGroup;
  avatarPreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;


  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private usersService: UsersService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      role: ['', Validators.required],
      password: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  

  onSave() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const formData = new FormData();
      formData.append('fullName', this.form.value.fullName);
      formData.append('email', this.form.value.email);
      formData.append('phone', this.form.value.phone);
      formData.append('password', this.form.value.password);
      formData.append('role', this.form.value.role);

      const statusValue = this.form.value.status === 'active' ? 1 : 0;
      formData.append('status', statusValue.toString());

      if (this.selectedFile) {
        formData.append('avatar', this.selectedFile);
      }
      

      this.usersService.Create(formData).subscribe({
        next: () => {
          this.notificationService.showSuccess('Tạo user thành công!');
          this.router.navigate(['/admin/userGetAll']);
        },
        error: (err) => {
          this.notificationService.showError('Tạo thất bại!');
          console.error(err);
        }
      });
    }
  }
}
