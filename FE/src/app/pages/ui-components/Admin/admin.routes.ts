import { Routes } from '@angular/router';
import { routesRoutes } from './routes/routes-route.routes';
import { busRoutes } from './busRoute/bus-route.routes';
import { busesRoutes } from './buses/buses-route.routes';
import { busTypeRoutes } from './bustype/bustype-route.routes';
import { driverRoutes } from './driver/driver-route.routes';
import { blogRoutes } from './blog/blog-route.routes';
import { ticketRoutes } from './ticket/ticket-route.routes';
import { contactRoutes } from './contact/contact-route.routes';
import { userRoutes } from './users/userRoute.routes';
import { ReviewComponent } from './review/review.component';
import { ReviewEditComponent } from './review-edit/review-edit.component';

export const AdminRoutes: Routes = [
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
      ...userRoutes,
      {
        path: 'reviews',
        component: ReviewComponent,
      },
      {
        path: 'reviewsEdit/:id',
        component: ReviewEditComponent,
      },
    ],
  },
];
