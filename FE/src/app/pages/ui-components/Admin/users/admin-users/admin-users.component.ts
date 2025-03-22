import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { userInterface } from 'src/app/interface/user.interface';

 @Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss',
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule, MatPaginatorModule, RouterModule],
})
export class AdminUsersComponent implements AfterViewInit {
displayedColumns: string[] = ['id', 'image', 'fullName', 'email', 'phone', 'role', 'status', 'actions'];
  dataSource = new MatTableDataSource<userInterface>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  users: userInterface[] = [
  { id: 1, image: 'user-1.jpg', fullName: 'Nguyễn Minh Hoàng', email: 'hoang.nguyen@gmail.com', phone: '0901234567', role: 'Admin', status: 'Hoạt động' },
  { id: 2, image: 'user-2.jpg', fullName: 'Trần Thị Lan', email: 'lan.tran@gmail.com', phone: '0987654321', role: 'User', status: 'Bị khóa' },
  { id: 3, image: 'user-3.jpg', fullName: 'Phạm Quang Huy', email: 'huy.pham@gmail.com', phone: '0911223344', role: 'User', status: 'Hoạt động' },
  { id: 4, image: 'user-4.jpg', fullName: 'Lê Thị Thanh', email: 'thanh.le@gmail.com', phone: '0933445566', role: 'Admin', status: 'Hoạt động' },
  { id: 5, image: 'user-5.jpg', fullName: 'Võ Đức Tài', email: 'tai.vo@gmail.com', phone: '0977553322', role: 'User', status: 'Hoạt động' },
  { id: 6, image: 'user-6.jpg', fullName: 'Đặng Thị Mai', email: 'mai.dang@gmail.com', phone: '0955667788', role: 'User', status: 'Hoạt động' }
  ];

  constructor() {
    this.dataSource.data = this.users;
  }

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

  editUser(user: userInterface) {
    console.log('Chỉnh sửa người dùng:', user);
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
    this.dataSource.data = this.users;
  }
}

