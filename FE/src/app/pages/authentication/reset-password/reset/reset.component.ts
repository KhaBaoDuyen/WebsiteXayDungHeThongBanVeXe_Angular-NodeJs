import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/apis/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reset',
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
  templateUrl: './reset.component.html',
})
export class ResetComponent implements OnInit {
  resetForm!: FormGroup;
  userId!: string;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.token = this.route.snapshot.paramMap.get('token') || '';

    this.resetForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  get password() {
    return this.resetForm.get('password');
  }

  get confirmPassword() {
    return this.resetForm.get('confirmPassword');
  }

  submitResetPassword(): void {
    if (this.resetForm.invalid) return;

    const data = {
      id: this.userId,
      token: this.token,
      password: this.resetForm.value.password
    };

    this.authService.resetNewPassword(data).subscribe({
      next: (res: any) => {
        this.notification.showSuccess(res.message || 'Đặt lại mật khẩu thành công!');
        this.router.navigate(['/auth/login']);
      },
      error: (err: any) => {
        this.notification.showError(err?.error?.message || 'Đặt lại mật khẩu thất bại.');
      }
    });
  }
}
