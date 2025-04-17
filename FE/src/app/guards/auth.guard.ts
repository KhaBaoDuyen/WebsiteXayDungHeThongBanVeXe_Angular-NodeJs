import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../services/apis/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (!token || this.authService.isTokenExpired(token)) {
      localStorage.removeItem('auth_token');
      this.notificationService.showError('Vui lòng đăng nhập để sử dụng tiện ích');
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}


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
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}