import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from './../../../services/apis/auth.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  successMessage: string = '';
  errorMessage: string = '';
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService,
  ) {
    this.notificationService.successMessage$.subscribe(
      (message) => (this.successMessage = message)
    );
    this.notificationService.errorMessage$.subscribe(
      (message) => (this.errorMessage = message)
    );
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required,]),
  });

  get f() {
    return this.form.controls;
  }

  login() {
    if (this.form.invalid) {
      return;
    }
    const loginData = {
      email: this.form.value.email!,
      password: this.form.value.password!
    };
  
    this.authService.Login(loginData).subscribe({
      next: (res: any) => {
        console.log(res); 
        if (res.success) {
          // Lưu thông tin localStorage
          localStorage.setItem('auth_token', res.token);
          localStorage.setItem('user_info', JSON.stringify({
            fullName: res.user.fullName,
            email: res.user.email,
            role: res.user.role
          }));
  
          this.notificationService.showSuccess(res.message);
          this.router.navigate(['/home']);
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
      }
    });
  }
  
 
}
