import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-get-all',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './contact-get-all.component.html',
  styleUrl: './contact-get-all.component.scss'
})
export class ContactGetAllComponent {

  displayedColumns: string[] = ['stt', 'question', 'email', 'status', 'actions'];
  dataSource = [
    { id: 1, question: 'Hỏi về dịch vụ', email: 'nguyenvanan@example.com', status: true },
    { id: 2, question: 'Hỏi về giá vé', email: 'nguyenvanbinh@example.com', status: false },
    { id: 3, question: 'Hỏi về lịch trình', email: 'nguyenvancuong@example.com', status: true },
    { id: 4, question: 'Hỏi về chính sách hoàn vé', email: 'nguyenvandung@example.com', status: false },
    { id: 5, question: 'Hỏi về phương thức thanh toán', email: 'nguyenvanem@example.com', status: true }
  ];

  constructor(private router: Router) { }

  navigateToReply(element: any) {
    this.router.navigate(['/reply', element.id]);
  }
}