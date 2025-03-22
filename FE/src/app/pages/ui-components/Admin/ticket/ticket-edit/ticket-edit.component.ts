import { Component } from '@angular/core';
import { ticketInterface } from 'src/app/interface/ticket.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-edit',
  imports: [CommonModule],
  templateUrl: './ticket-edit.component.html',
  styleUrl: './ticket-edit.component.scss'
})
export class TicketEditComponent {
  ticket: ticketInterface = {
    id: 1, 
    userID: 1,
    userName: 'Nguyễn Văn A', 
    phone: '0123456789', 
    tripID: 101, 
    seatID: 'A1', 
    finalPrice: 200000, 
    status: 'Confirmed',
    createdAt: new Date()
  }
}
