import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/apis/auth.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (!token || this.authService.isTokenExpired(token)) {
      localStorage.removeItem('auth_token');
      this.notificationService.showError('Vui lòng đăng nhập');
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (!this.authService.isAdmin()) {
      this.notificationService.showError('Không có quyền truy cập hệ thống quản tị');
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
