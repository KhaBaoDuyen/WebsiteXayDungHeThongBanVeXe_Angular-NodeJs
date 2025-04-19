import { CommonModule } from '@angular/common';
import { Component, Output, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormCancelComponent } from 'src/app/components/form-cancel/form-cancel.component';
import { NavbarComponent } from 'src/app/layouts/Client/navbar/navbar.component';
import { BookingService } from 'src/app/services/apis/Client/booking.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ticket-history',
  imports: [CommonModule,NavbarComponent, FormCancelComponent],
  templateUrl: './ticket-history.component.html',
})
export class TicketHistoryComponent implements OnInit {
  @ViewChild('cancelModal') cancelModal!: FormCancelComponent;
    private jwtHelperService = new JwtHelperService();
    userId: number;
  
    constructor(
      private route: ActivatedRoute,
      private bookingService: BookingService,
      private notificationService: NotificationService,
      private router: Router,
      private dialog: MatDialog
    ) {
    }
  ticketHistory = [
    {
      id: 1,
      code: '098765',
      price: 100,
      train: '1234',
      from: 'Hà Nội',
      to: 'Hồ Chí Minh',
      departure: '07:00 AM',
      arrival: '10:00 AM',
      date: '20/08/2022',
      seat: 'A3',
      name: 'Nguyễn Văn A',
      status: 'Chưa khởi hành'
    },
    {
      id: 2,
      code: '123456',
      price: 150,
      train: '5678',
      from: 'Đà Nẵng',
      to: 'Nha Trang',
      departure: '08:00 AM',
      arrival: '12:00 PM',
      date: '22/08/2022',
      seat: 'B5',
      name: 'Trần Thị B',
      status: 'Chưa khởi hành'
    }
  ];

  ngOnInit(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const decode = this.jwtHelperService.decodeToken(token);
      this.userId = decode?.id;
      this.getHistory();
    }
  }
  
  getHistory(): void {
    const history = { id: this.userId };
  
    this.bookingService.getAllByUser(history).subscribe({
      next: (res: any) => {
        this.ticketHistory = res.data.map((item: any) => {
          const seatNumbers = item.bookingDetails.map((b: any) => b.seatNumber).join(', ');
          const price = item.finalPrice;
          const startDate = new Date(item.startDate);
          const date = startDate.toLocaleDateString('vi-VN');
          const time = startDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  
          return {
            id: item.id,
            code: `#${item.id.toString().padStart(6, '0')}`,
            price: price,
            from: item.startPoint,
            to: item.endPoint,
            departure: time,
            date: date,
            seat: seatNumbers,
            name: item.fullName,
            status: item.status
          };
        });
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy lịch sử vé:', err);
      }
    });
  }
  
  openCancelDialog(id: number): void {
    const dialogRef = this.dialog.open(FormCancelComponent, {
      data: {
        id: id,
        service: (id: number, note?: string) =>
          this.bookingService.cancelTicket({ id, note })
      }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Deleted :', result);
      }
      this.getHistory();
    });
  }
  
  
  
  
}
