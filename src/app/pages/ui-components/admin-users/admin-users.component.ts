import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss',
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule, MatPaginatorModule, RouterModule],
})
export class AdminUsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'phone', 'role', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  users: User[] = [
    { id: 1, fullName: 'Nguyễn Văn A', email: 'a@gmail.com', phone: '0987654321', role: 'Admin', status: 'Hoạt động' },
    { id: 2, fullName: 'Trần Thị B', email: 'b@gmail.com', phone: '0976543210', role: 'User', status: 'Bị khóa' },
    { id: 3, fullName: 'Lê Văn C', email: 'c@gmail.com', phone: '0912345678', role: 'User', status: 'Hoạt động' },
    { id: 4, fullName: 'Lê Văn C', email: 'c@gmail.com', phone: '0912345678', role: 'User', status: 'Hoạt động' },
    { id: 5, fullName: 'Lê Văn C', email: 'c@gmail.com', phone: '0912345678', role: 'User', status: 'Hoạt động' },
    { id: 6, fullName: 'Lê Văn C', email: 'c@gmail.com', phone: '0912345678', role: 'User', status: 'Hoạt động' },

  ];

  constructor() {
    this.dataSource.data = this.users;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editUser(user: User) {
    console.log('Chỉnh sửa người dùng:', user);
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
    this.dataSource.data = this.users;
  }
}

interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}