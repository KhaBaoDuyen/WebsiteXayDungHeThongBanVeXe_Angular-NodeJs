import { Routes } from '@angular/router';

// ui
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { ReviewComponent } from './review/review.component';

import { busesRoutes } from "../ui-components/buses/buses-route.routes";
import { ticketRoutes } from "../ui-components/ticket/ticket-route.routes";
import { busRoutes } from './busRoute/bus-route.routes';
import { routesRoutes } from './routes/routes-route.routes';
import { busTypeRoutes } from './bustype/bustype-route.routes';
import { driverRoutes } from './driver/driver-route.routes';
import { blogRoutes } from './blog/blog-route.routes';
import { contactRoutes } from './contact/contact-route.routes';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      ...routesRoutes,
      ...busRoutes,
      ...busesRoutes,
      ...busTypeRoutes,
      ...driverRoutes,
      ...blogRoutes,
      ...ticketRoutes,
      ...contactRoutes,
      {
        path: 'reviews',
        component: ReviewComponent,
      },
      {
        path: 'UserGetAll',
        component: AdminUsersComponent,
      },
    ],
  },
];
