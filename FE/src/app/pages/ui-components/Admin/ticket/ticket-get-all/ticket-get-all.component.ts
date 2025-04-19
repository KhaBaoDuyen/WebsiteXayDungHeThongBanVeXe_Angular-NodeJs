import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FormSearchComponent } from '../../../../../components/form-search/form-search.component';
import { BookingsService } from 'src/app/services/apis/Admin/bookings.Service';
import { bookingInterface } from 'src/app/interface/booking.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-get-all',
  templateUrl: './ticket-get-all.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatPaginatorModule,
    RouterModule,
    FormSearchComponent,
  ],
})
export class TicketGetAllComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'fullName', 'phone', 'email', 'startPoint', 'startDate', 'finalPrice', 'status', 'actions'];
  dataSource = new MatTableDataSource<bookingInterface>([]);
  bookings: bookingInterface[] = [];
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private bookingsService: BookingsService) {}

  ngOnInit() {
    this.fetchBookings();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Phân trang theo số lượng';
  }

  fetchBookings() {
    this.bookingsService.List().subscribe({
      next: (data: any) => {
        // Nếu backend trả về dạng { status, data }, bạn cần truy cập data.data
        const bookings = Array.isArray(data) ? data : data?.data;

        if (Array.isArray(bookings)) {
          this.bookings = bookings;
          this.dataSource.data = [...this.bookings];
        } else {
          console.error('❌ Dữ liệu không phải mảng:', bookings);
        }
      },
      error: (err: any) => {
        console.error('❌ Lỗi lấy danh sách bookings:', err);
      }
    });
  }

  deleteBooking(id: number) {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6c757d'
    }).then(result => {
      if (result.isConfirmed) {
        this.bookingsService.Delete(id).subscribe({
          next: () => {
            this.bookings = this.bookings.filter(booking => booking.id !== id);
            this.dataSource.data = [...this.bookings];
            Swal.fire('Đã xóa!', 'Booking đã được xóa thành công.', 'success');
          },
          error: (err: any) => {
            console.error('❌ Lỗi khi xóa booking:', err);
            Swal.fire('Lỗi!', 'Không thể xóa booking.', 'error');
          }
        });
      }
    });
  }

  handleSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    if (!searchTerm.trim()) {
      this.dataSource.data = [...this.bookings];
    } else {
      const lower = searchTerm.toLowerCase();
      this.dataSource.data = this.bookings.filter(booking => {
        const fullName = booking.fullName?.toLowerCase() || '';
        const email = booking.email?.toLowerCase() || '';
        return fullName.includes(lower) || email.includes(lower);
      });
    }
  }
}
