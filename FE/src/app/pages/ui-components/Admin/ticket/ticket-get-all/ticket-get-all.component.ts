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
  displayedColumns: string[] = [
    'id', 'fullName', 'phone', 'startPoint', 'startDate', 'finalPrice', 'status', 'actions',
  ];
  dataSource = new MatTableDataSource<bookingInterface>([]);
  bookings: bookingInterface[] = [];
  searchTerm: string = '';

  statusOptions = [
    { value: 'confirmed', label: 'Đã nhận vé' },
    { value: 'pending', label: 'Chưa nhận vé' },
    { value: 'canceled', label: 'Đã hủy' },
  ];

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
      },
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
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookingsService.Delete(id).subscribe({
          next: () => {
            this.bookings = this.bookings.filter((booking) => booking.id !== id);
            this.dataSource.data = [...this.bookings];
            Swal.fire('Đã xóa!', 'Booking đã được xóa thành công.', 'success');
          },
          error: (err: any) => {
            console.error('❌ Lỗi khi xóa booking:', err);
            Swal.fire('Lỗi!', 'Không thể xóa booking.', 'error');
          },
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
      this.dataSource.data = this.bookings.filter((booking) => {
        const fullName = booking.fullName?.toLowerCase() || '';
        const email = booking.email?.toLowerCase() || '';
        return fullName.includes(lower) || email.includes(lower);
      });
    }
  }

  updateStatus(ticketId: number, newStatus: string) {
    this.bookingsService.Update(ticketId, { status: newStatus }).subscribe({
      next: (updatedBooking: bookingInterface) => {
        const booking = this.bookings.find((b) => b.id === ticketId);
        if (booking) {
          booking.status = newStatus as 'confirmed' | 'pending' | 'canceled';
          this.dataSource.data = [...this.bookings];
        }
        Swal.fire('Thành công!', 'Cập nhật trạng thái thành công.', 'success');
      },
      error: (err: any) => {
        console.error('❌ Lỗi cập nhật trạng thái:', err);
        Swal.fire('Lỗi!', 'Không thể cập nhật trạng thái.', 'error');
      },
    });
  }

  onStatusChange(event: Event, bookingId: number) {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;
    const booking = this.bookings.find(b => b.id === bookingId);
  
    if (!booking) return;
  
    if (newStatus === 'canceled') {
      const now = new Date();
      const startDate = booking.startDate ? new Date(booking.startDate) : null;
  
      if (!startDate || isNaN(startDate.getTime())) {
        Swal.fire('Lỗi!', 'Không xác định được thời gian khởi hành.', 'error');
        return;
      }
  
      const diffInMinutes = (startDate.getTime() - now.getTime()) / (1000 * 60);
  
      if (diffInMinutes < 30) {
        Swal.fire('Không thể hủy!', 'Đơn vé chỉ có thể hủy trước thời gian khởi hành 30 phút.', 'warning');
        return;
      }
  
      Swal.fire({
        title: 'Bạn có chắc muốn hủy đơn này?',
        text: 'Đơn sẽ không thể khôi phục!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hủy đơn',
        cancelButtonText: 'Không',
        confirmButtonColor: '#e3342f',
        cancelButtonColor: '#6c757d',
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateStatus(bookingId, newStatus);
        }
      });
    } else {
      this.updateStatus(bookingId, newStatus);
    }
  }
  
}
