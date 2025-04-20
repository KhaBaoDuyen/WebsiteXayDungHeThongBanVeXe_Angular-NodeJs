import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingsService } from 'src/app/services/apis/Admin/bookings.Service';
import { bookingInterface } from 'src/app/interface/booking.interface';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-ticket-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-edit.component.html',
})
export class TicketEditComponent implements OnInit {
  ticket!: bookingInterface;
  ticketId!: number;

  constructor(
    private route: ActivatedRoute,
    private ticketService: BookingsService
  ) {}

  ngOnInit(): void {
    // Lấy ticketId từ route params
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'));
    // Gọi API để lấy chi tiết ticket
    this.getTicketById();
  }

  // Phương thức lấy chi tiết booking theo ID
  getTicketById() {
    this.ticketService.getById(this.ticketId).subscribe({
      next: (data: any) => {
        this.ticket = data?.data || data; // Gán dữ liệu nhận được vào ticket
      },
      error: (err) => {
        console.error('❌ Lỗi lấy ticket:', err);
      }
    });
  }

  // Phương thức chuyển đổi trạng thái sang tiếng Việt
  getStatusInVietnamese(status: string | undefined): string {
    if (!status) {
      return 'Không xác định'; // Trạng thái không xác định
    }
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận';
      case 'pending':
        return 'Đang chờ';
      case 'canceled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  }
}
