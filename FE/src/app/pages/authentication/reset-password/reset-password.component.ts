import { AuthService } from './../../../services/apis/auth.service';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,

  ) {

  }
  resetForm = new FormGroup({

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  })
  get email() { return this.resetForm.get('email') };


  resetPassword() {
    this.resetForm.markAllAsTouched();
    if (this.resetForm.invalid) {
      return;
    }

    const email = this.resetForm.value.email ?? '';

    this.authService.ResetPassword({ email }).subscribe({
      next: (res: any) => {
        this.notificationService.showSuccess(res.message || 'Đã gửi email khôi phục mật khẩu');
      },
      error: (err: any) => {
        if (err.error && err.error.message) {
          this.notificationService.showError(err.error.message);
        } else {
          this.notificationService.showError('Lỗi gửi email khôi phục mật khẩu');
        }
      }
    });
  }

}