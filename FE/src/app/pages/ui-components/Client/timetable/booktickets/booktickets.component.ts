import { JwtHelperService } from '@auth0/angular-jwt';
import { routesInterface } from './../../../../../interface/routes.interface';
import { HomeService } from 'src/app/services/apis/Client/home.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { BookingService } from 'src/app/services/apis/Client/booking.sevice';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-booktickets',
  imports: [CommonModule,
    FormsModule,
  ],
  templateUrl: './booktickets.component.html',
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
  userId:number| string  ; 

  private jwtHelperService = new JwtHelperService();


  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private notificationService: NotificationService,
    private router: Router,
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
    };

     this.bookingService.Create(bookingData).subscribe({
      next: (res:any) => {
        if(res.success){
          this.notificationService.showSuccess(res.message);
          this.router.navigate(['/timetable']);
        }
      },
      error: (err:any) => {
          this.notificationService.showError(err.error?.message);
      },
     })
    
    console.log('Booking Data:', bookingData);
  }


}
