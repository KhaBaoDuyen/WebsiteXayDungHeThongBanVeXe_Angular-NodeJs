import { JwtHelperService } from '@auth0/angular-jwt';
import { routesInterface } from './../../../../../interface/routes.interface';
import { HomeService } from 'src/app/services/apis/Client/home.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { BookingService } from 'src/app/services/apis/Client/booking.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-booktickets',
  imports: [CommonModule,
    FormsModule,
  ],
  templateUrl: './booktickets.component.html',
  styleUrl: './booktickets.scss'
})
export class BookticketsComponent {
  tripId: number;
  tripsData: any = {};
  selectedSeat: any[] = [];
  fullName: string = "";
  email: string = "";
  phone: string | number = "";
  totelSeat: number = 0;
  totalPrice: number = 0;
  userId: number | string;

  private jwtHelperService = new JwtHelperService();


  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog
  ) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.tripId = +id;
        this.getById(this.tripId);
      }
    });

    const token = localStorage.getItem('auth_token');
    if (token) {
      const decode = this.jwtHelperService.decodeToken(token);
      this.userId = decode?.id;
      this.fullName = decode?.fullName;
      this.email = decode?.email;
      this.phone = decode?.phone;
    }

    this.route.queryParams.subscribe(params => {
      if (params['success'] === 'true') {
        this.notificationService.showSuccess('Đã đặt vé thành công!');
      } else if (params['success'] === 'false') {
        this.notificationService.showError('Đã có lỗi xảy ra trong qua stirnhf đặt vé!');
      }
    });
  }


  getById(tripId: number) {
    this.homeService.GetById(tripId).subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          this.tripsData = res.data;
          console.log(this.tripsData);

        }
      }
    })
  }

  onSeatToggle(seat: any, event: any) {
    console.log('Ghế được chonj ==>:', seat);
    if (event.target.checked) {
      this.selectedSeat.push(seat);
      console.log(this.selectedSeat)

    } else {
      this.selectedSeat = this.selectedSeat.filter(s => s.seatNumber !== seat.seatNumber);
    }
    this.totelSeat = this.selectedSeat.length;
    this.totalPrice = this.totelSeat * this.tripsData.trips[0].price;
  }

  getSelectedSeatNumbers(): string {
    return this.selectedSeat.map(seat => seat.seatNumber).join(', ');
  }


  //--------------------[ BOOKING ]--------------------
  createBooking() {
    if (!this.tripsData.trips || this.tripsData.trips.length === 0) {
      this.notificationService.showError('Dữ liệu chuyến đi không hợp lệ!');
      return;
    }

    const selectedPaymentMethod = (document.querySelector('input[name="payment_method"]:checked') as HTMLInputElement)?.value;

    const bookingData = {
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      startPoint: this.tripsData.startPoint,
      endPoint: this.tripsData.endPoint,
      totalSeat: this.totelSeat,
      finalPrice: this.totalPrice,
      startDate: this.tripsData.trips[0].departureTime,
      userId: this.userId,
      seatNumber: this.getSelectedSeatNumbers(),
      price: this.tripsData.trips[0].price,
      selectedSeats: this.selectedSeat,
      payment_method: Number(selectedPaymentMethod)
    };


    this.bookingService.Create(bookingData).subscribe({
      next: (res: any) => {
        if (res.success) {
          if (bookingData.payment_method === 2 && res.paymentUrl) {
            window.location.href = res.paymentUrl;
          }else {
            // Thanh toán tiền mặt
            this.notificationService.showSuccess(res.message || "Đặt vé thành công.");
            this.router.navigate(['/timetable']);
          }
        } else {
          this.notificationService.showError(res.message || 'Đặt vé thất bại');
        }
      },
      error: (err: any) => {
        this.notificationService.showError(err.error?.message || 'Có lỗi xảy ra khi đặt vé');
      }
    });


  }
}
