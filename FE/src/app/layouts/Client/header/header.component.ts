import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-header',
  imports: [RouterLink, MatMenuModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  [x: string]: any;
  get currentUser() {
    return this['authService'].getCurrentUser();
  }
  constructor(
    private router: Router,
  ) { }
  isLoggedIn: boolean = false;
  fullName: string = '';
  ngOnInit() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.isLoggedIn = true;
      const user = JSON.parse(localStorage.getItem('user_info') || '{}');
      this.fullName = user.fullName;
    }
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    this.isLoggedIn = false;
    this.router.navigate(['/auth/login']);
  }
}
