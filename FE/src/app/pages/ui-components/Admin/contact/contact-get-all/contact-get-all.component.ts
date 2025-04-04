import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { contactInterface } from 'src/app/interface/contactInterface';
import { FormSearchComponent } from '../../../../../components/form-search/form-search.component';

@Component({
  selector: 'app-contact-get-all',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterModule,
    FormSearchComponent,
  ],
  templateUrl: './contact-get-all.component.html',
})
export class ContactGetAllComponent {
  displayedColumns: string[] = ['stt', 'question', 'email', 'status', 'actions'];
  dataSource: contactInterface[] = [
    { id: 1, question: 'Hỏi về dịch vụ', email: 'nguyenvanan@example.com', status: true },
    { id: 2, question: 'Hỏi về giá vé', email: 'nguyenvanbinh@example.com', status: false },
    { id: 3, question: 'Hỏi về lịch trình', email: 'nguyenvancuong@example.com', status: true },
    { id: 4, question: 'Hỏi về chính sách hoàn vé', email: 'nguyenvandung@example.com', status: false },
    { id: 5, question: 'Hỏi về phương thức thanh toán', email: 'nguyenvanem@example.com', status: true },
  ];

  searchTerm: string = '';

  handleSearch(searchTerm: string) {
    this.searchTerm = searchTerm; 

    if (this.searchTerm.toLowerCase() === 'đã trả lời') {
      this.dataSource = this.dataSource.filter(route => route.status === true);
    } else if (this.searchTerm.toLowerCase() === 'chưa trả lời') {
      this.dataSource = this.dataSource.filter(route => route.status === false);
    } else if (!this.searchTerm)

    if (!searchTerm.trim()) {
      this.dataSource = [
        { id: 1, question: 'Hỏi về dịch vụ', email: 'nguyenvanan@example.com', status: true },
        { id: 2, question: 'Hỏi về giá vé', email: 'nguyenvanbinh@example.com', status: false },
        { id: 3, question: 'Hỏi về lịch trình', email: 'nguyenvancuong@example.com', status: true },
        { id: 4, question: 'Hỏi về chính sách hoàn vé', email: 'nguyenvandung@example.com', status: false },
        { id: 5, question: 'Hỏi về phương thức thanh toán', email: 'nguyenvanem@example.com', status: true },
      ];
    } else {
      this.dataSource = this.dataSource.filter(route =>
        route.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }


}