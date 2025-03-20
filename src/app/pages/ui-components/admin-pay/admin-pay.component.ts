import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

interface Payment {
  id: string;
  userName: string;
  amount: number;
  paymentMethod: string;
  status: string; // "Thành công", "Đang xử lý", "Đã hoàn tiền"
}
@Component({
  selector: 'app-admin-pay',
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule, MatPaginatorModule, RouterModule],
  templateUrl: './admin-pay.component.html',
  styleUrl: './admin-pay.component.scss'
})
export class AdminPayComponent {
  displayedColumns: string[] = ['id', 'userName', 'amount', 'paymentMethod', 'status', 'actions'];
  dataSource: Payment[] = [
    { id: 'TXN001', userName: 'Nguyễn Văn A', amount: 500000, paymentMethod: 'Momo', status: 'Đang xử lý' },
    { id: 'TXN002', userName: 'Trần Thị B', amount: 1200000, paymentMethod: 'ZaloPay', status: 'Thành công' },
    { id: 'TXN003', userName: 'Lê Văn C', amount: 250000, paymentMethod: 'Chuyển khoản', status: 'Đã hoàn tiền' }
  ];

  // Xác nhận thanh toán
  confirmPayment(payment: Payment) {
    payment.status = 'Thành công';
    alert(`Đã xác nhận thanh toán cho ${payment.userName}`);
  }

  // Hoàn tiền
  refundPayment(payment: Payment) {
    if (confirm(`Bạn có chắc chắn muốn hoàn tiền cho giao dịch ${payment.id}?`)) {
      payment.status = 'Đã hoàn tiền';
      alert(`Đã hoàn tiền cho ${payment.userName}`);
    }
  }

  // Đổi màu trạng thái
  getStatusColor(status: string): string {
    switch (status) {
      case 'Thành công': return 'green';
      case 'Đang xử lý': return 'orange';
      case 'Đã hoàn tiền': return 'red';
      default: return 'black';
    }
  }
}
