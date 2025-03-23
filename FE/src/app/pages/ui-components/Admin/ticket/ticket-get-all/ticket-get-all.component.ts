import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ViewChild, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormDeleteComponent } from 'src/app/components/form-delete/form-delete.component';
import { ticketInterface} from 'src/app/interface/ticket.interface';


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
    MatSortModule,
    RouterModule,
    FormDeleteComponent
  ],
})
export class TicketGetAllComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'userName', 'phone', 'tripID', 'seatID', 'finalPrice', 'status', 'actions'];
  dataSource = new MatTableDataSource<ticketInterface>(
    [
      { id: 1, userName: 'Nguyễn Văn A', phone: '0123456789', tripID: 101, seatID: 'A1', finalPrice: 200000, status: 'Confirmed', userID: 1, createdAt: new Date},
      { id: 2, userName: 'Trần Thị B', phone: '0987654321', tripID: 102, seatID: 'B3', finalPrice: 250000, status: 'Pending', userID: 1, createdAt: new Date },
      { id: 3, userName: 'Lê Văn C', phone: '0345678912', tripID: 103, seatID: 'C5', finalPrice: 180000, status: 'Canceled', userID: 1, createdAt: new Date },
      { id: 4, userName: 'Nguyễn Văn A', phone: '0123456789', tripID: 101, seatID: 'A1', finalPrice: 200000, status: 'Confirmed', userID: 1, createdAt: new Date },
      { id: 5, userName: 'Trần Thị B', phone: '0987654321', tripID: 102, seatID: 'B3', finalPrice: 250000, status: 'Pending', userID: 1, createdAt: new Date },
    ]
  );


  showDeleteConfirmation = false; 
  selectedTicketId: number | null = null; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  
    // Mở form xác nhận xóa
    openDeleteConfirmation(TicketId: number) {
      this.selectedTicketId = TicketId;
      this.showDeleteConfirmation = true;
    }
  
    // Xử lý khi xác nhận xóa
    handleDeleteConfirmed() {
      if (this.selectedTicketId !== null) {
        this.dataSource.data = this.dataSource.data.filter(
          (ticket) => ticket.id !== this.selectedTicketId
        );
      }
      this.showDeleteConfirmation = false; 
    }
  
    handleCancel() {
      this.showDeleteConfirmation = false; 
    }
}
