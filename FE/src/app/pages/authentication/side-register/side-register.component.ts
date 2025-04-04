import { AuthService } from './../../../services/apis/auth.service';
import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { userInterface } from 'src/app/interface/user.interface';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { Subscription } from 'rxjs';

// kiểm tra mật khẩu và xác nhận mật khẩu
function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
  styleUrls: ['./register.scss'],
})
export class AppSideRegisterComponent {
  options = this.settings['getOptions']();
  Users: userInterface[] = [];
  successMessage: string = '';
  errorMessage: string = '';


  constructor(
    private settings: CoreService,
    private notificationService: NotificationService,
    private authService: AuthService,
  ) { this.notificationService.successMessage$.subscribe(
    (message) => (this.successMessage = message)
  );
  this.notificationService.errorMessage$.subscribe(
    (message) => (this.errorMessage = message)
  );}

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: passwordMatchValidator() });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const formData = {
      fullName: this.form.value.fullName || '',
      email: this.form.value.email || '',
      password: this.form.value.password || '',
      phone: this.form.value.phone || '',
    };

    this.authService.Register(formData).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.notificationService.showSuccess(res.message);
        } else {
          this.notificationService.showError(res.message || 'Đã xảy ra lỗi không xác định');
        }
      },
      error: (err: any) => {
        if (err.error && err.error.message) {
          this.notificationService.showError(err.error.message);
        } else if (err.message) {
          this.notificationService.showError(err.message);
        } else {
          this.notificationService.showError('Lỗi đăng ký không xác định');
        }
        console.error('Lỗi đăng ký:', err);
      }
    });
  }
}
