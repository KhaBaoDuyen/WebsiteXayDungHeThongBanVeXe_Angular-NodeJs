import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { BusGetAllComponent } from './busRoute/bus-get-all/bus-get-all.component';
import { BusCreateComponent } from './busRoute/bus-create/bus-create.component';
import { RoutesGetAllComponent } from './routes/routes-get-all/routes-get-all.component';
import { RoutesCreateComponent } from './routes/routes-create/routes-create.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { BustypeGetAllComponent } from './bustype/bustype-get-all/bustype-get-all.component';
import { BustypeCreateComponent } from './bustype/bustype-create/bustype-create.component';
import { DriverGetAllComponent } from './driver/driver-get-all/driver-get-all.component';
import { DriverCreateComponent } from './driver/driver-create/driver-create.component';
import { BlogGetAllComponent} from './blog/blog-get-all/blog-get-all.component';
import { BlogCreateComponent} from './blog/blog-create/blog-create.component';
import { TicketGetAllComponent } from './ticket/ticket-get-all/ticket-get-all.component';
import { TicketPaidComponent } from './ticket/ticket-paid/ticket-paid.component';
import { TicketCanceledComponent } from './ticket/ticket-canceled/ticket-canceled.component';
import { ReviewComponent } from './review/review.component';
import { BusesGetAllComponent } from './buses/buses-get-all/buses-get-all.component';
import { BusesCreateComponent } from './buses/buses-create/buses-create.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'busesGetAll',
        component: BusesGetAllComponent,
      },
      {
        path: 'busesAdd',
        component: BusesCreateComponent,
      },
      {
        path: 'reviews',
        component: ReviewComponent,
      },
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
        path: 'blogGetAll',
        component: BlogGetAllComponent,
      },
      {
        path: 'blogAdd',
        component: BlogCreateComponent,
      },
      {
        path: 'driverGetAll',
        component: DriverGetAllComponent,
      },
      {
        path: 'driverAdd',
        component: DriverCreateComponent,
      },
      {
        path: 'busTypeGetAll',
        component: BustypeGetAllComponent,
      },
      {
        path: 'busTypeAdd',
        component: BustypeCreateComponent,
      },
      {
        path: 'routesGetAll',
        component: RoutesGetAllComponent,
      },
      {
        path: 'routesAdd',
        component: RoutesCreateComponent,
      },
      {
        path: 'busGetAll',
        component: BusGetAllComponent,
      },
      {
        path: 'busAdd',
        component: BusCreateComponent,
      },
      {
        path: 'UserGetAll',
        component: AdminUsersComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
    ],
  },
];
