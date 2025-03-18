import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-ticket-get-all',
  templateUrl: './ticket-get-all.component.html',
  styleUrl: './ticket-get-all.component.scss',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule
  ],
})
export class TicketGetAllComponent implements OnInit {
  displayedColumns: string[] = ['id', 'userName', 'phone', 'tripID', 'seatID', 'finalPrice', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>();

  // Dữ liệu cứng (mock data)
  tickets = [
    { id: 1, userName: 'Nguyễn Văn A', phone: '0123456789', tripID: 101, seatID: 'A1', finalPrice: 200000, status: 'Confirmed' },
    { id: 2, userName: 'Trần Thị B', phone: '0987654321', tripID: 102, seatID: 'B3', finalPrice: 250000, status: 'Pending' },
    { id: 3, userName: 'Lê Văn C', phone: '0345678912', tripID: 103, seatID: 'C5', finalPrice: 180000, status: 'Canceled' },
    { id: 4, userName: 'Nguyễn Văn A', phone: '0123456789', tripID: 101, seatID: 'A1', finalPrice: 200000, status: 'Confirmed' },
    { id: 5, userName: 'Trần Thị B', phone: '0987654321', tripID: 102, seatID: 'B3', finalPrice: 250000, status: 'Pending' },
  ];

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.dataSource.data = this.tickets;
  }

  editBooking(booking: any): void {
    console.log('Editing booking:', booking);
  }

  deleteBooking(id: number): void {
    console.log('Deleting booking with ID:', id);
    this.dataSource.data = this.dataSource.data.filter(ticket => ticket.id !== id);
  }
}
