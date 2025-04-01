import { CommonModule } from '@angular/common';
import { Component, Output, ViewChild  } from '@angular/core';
import { FormCancelComponent } from 'src/app/components/form-cancel/form-cancel.component';
import { NavbarComponent } from 'src/app/layouts/Client/navbar/navbar.component';
@Component({
  selector: 'app-ticket-history',
  imports: [CommonModule,NavbarComponent, FormCancelComponent],
  templateUrl: './ticket-history.component.html',
})
export class TicketHistoryComponent {
  @ViewChild('cancelModal') cancelModal!: FormCancelComponent;
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
}
