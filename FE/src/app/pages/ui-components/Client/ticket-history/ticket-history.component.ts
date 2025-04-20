import { CommonModule } from '@angular/common';
import { Component, Output, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormCancelComponent } from 'src/app/components/form-cancel/form-cancel.component';
import { NavbarComponent } from 'src/app/layouts/Client/navbar/navbar.component';
import { BookingService } from 'src/app/services/apis/Client/booking.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ticket-history',
  imports: [CommonModule,NavbarComponent, FormCancelComponent],
  templateUrl: './ticket-history.component.html',
})
export class TicketHistoryComponent implements OnInit {
  @ViewChild('cancelModal') cancelModal!: FormCancelComponent;
    private jwtHelperService = new JwtHelperService();
    userId: number;
    ticketHistory: any[] = [];

    constructor(
      private route: ActivatedRoute,
      private bookingService: BookingService,
      private notificationService: NotificationService,
      private router: Router,
      private dialog: MatDialog
    ) {
    }

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
            status: item.status,
            startDate: startDate,
          };
        });
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy lịch sử vé:', err);
      }
    });
    
  }
  
  openCancelDialog(id: number, startDate: Date): void {
    const dialogRef = this.dialog.open(FormCancelComponent, {
      data: {
        id: id,
        startDate: startDate,
        service: (id: number, note?: string) =>
          this.bookingService.cancelTicket({ id, note, startDate })
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
