import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormDeleteComponent } from 'src/app/components/form-delete/form-delete.component';
import { FormSearchComponent } from '../../../../../components/form-search/form-search.component';
@Component({
  selector: 'app-ticket-canceled',
  templateUrl: './ticket-canceled.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatPaginator,
    FormDeleteComponent,
    FormSearchComponent,
  ],
})
export class TicketCanceledComponent {
  displayedColumns: string[] = ['id', 'userName', 'phone', 'tripID', 'seatID', 'finalPrice', 'cancelReason', 'actions'];
  dataSource = new MatTableDataSource([
    { id: 1, userName: 'Nguyễn Văn A', phone: '0987654321', tripID: 'HN-HCM', seatID: 'A1', finalPrice: 500000, cancelReason: 'Lịch trình thay đổi' },
    { id: 2, userName: 'Trần Thị B', phone: '0976543210', tripID: 'HCM-ĐN', seatID: 'B3', finalPrice: 400000, cancelReason: 'Bị ốm' },
    { id: 3, userName: 'Lê Văn C', phone: '0965432109', tripID: 'ĐN-HN', seatID: 'C2', finalPrice: 450000, cancelReason: 'Không kịp giờ' },
  ]);
  searchTerm: string = '';

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

    handleSearch(searchTerm: string) {
      this.searchTerm = searchTerm; 
  
      if (!searchTerm.trim()) {
        this.dataSource.data = [
          { id: 1, userName: 'Nguyễn Văn A', phone: '0987654321', tripID: 'HN-HCM', seatID: 'A1', finalPrice: 500000, cancelReason: 'Lịch trình thay đổi' },
          { id: 2, userName: 'Trần Thị B', phone: '0976543210', tripID: 'HCM-ĐN', seatID: 'B3', finalPrice: 400000, cancelReason: 'Bị ốm' },
          { id: 3, userName: 'Lê Văn C', phone: '0965432109', tripID: 'ĐN-HN', seatID: 'C2', finalPrice: 450000, cancelReason: 'Không kịp giờ' },
        ];
      } else {
        this.dataSource.data = this.dataSource.data.filter(route =>
          route.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          route.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          route.tripID.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }
}
