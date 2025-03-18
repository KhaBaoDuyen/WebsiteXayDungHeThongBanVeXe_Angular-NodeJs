import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-ticket-paid',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './ticket-paid.component.html',
  styleUrls: ['./ticket-paid.component.scss']
})
export class TicketPaidComponent {
  displayedColumns: string[] = ['id', 'userName', 'phone', 'tripID', 'seatID', 'finalPrice', 'actions'];

  tickets = [
    { id: 1, userName: 'Nguyễn Văn A', phone: '0123456789', tripID: 101, seatID: 'A1', finalPrice: 200000, status: 'Paid' },
    { id: 2, userName: 'Trần Thị B', phone: '0987654321', tripID: 102, seatID: 'B3', finalPrice: 250000, status: 'Pending' },
    { id: 3, userName: 'Lê Văn C', phone: '0345678912', tripID: 103, seatID: 'C5', finalPrice: 180000, status: 'Paid' },
    { id: 4, userName: 'Phạm Thị D', phone: '0912345678', tripID: 104, seatID: 'D2', finalPrice: 220000, status: 'Confirmed' }
  ];

  dataSource = this.tickets.filter(ticket => ticket.status === 'Paid');

  editTicket(ticket: any) {
    console.log('Sửa vé:', ticket);
  }

  deleteTicket(id: number) {
    console.log('Xóa vé với ID:', id);
  }
}
