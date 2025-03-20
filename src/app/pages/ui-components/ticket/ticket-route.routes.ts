import { TicketGetAllComponent } from "./ticket-get-all/ticket-get-all.component";
import{TicketPaidComponent} from "./ticket-paid/ticket-paid.component";
import{TicketCanceledComponent} from "./ticket-canceled/ticket-canceled.component";
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { Routes } from '@angular/router';



export const ticketRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ticketGetAll',
        component: TicketGetAllComponent,
      },
      {
        path: 'ticketPaid',
        component: TicketPaidComponent,
      },
      {
        path: 'ticketCanceled',
        component: TicketCanceledComponent,
      },
      {
        path: 'ticketEdit/:id',
        component: TicketEditComponent,
      },
    ],
  },
];
