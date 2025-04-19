import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { BlogComponent } from "./blog/blog.component";
import { TimetableComponent } from "./timetable/timetable.component";
import { ContactComponent } from "./contact/contact.component";
import { TicketHistoryComponent } from "./ticket-history/ticket-history.component";
import { AuthenticationRoutes } from "../../authentication/authentication.routes";
import { BookticketsComponent } from "./timetable/booktickets/booktickets.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard  } from '../../../guards/auth.guard';

export const ClientRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'timetable',
    component: TimetableComponent,
  },
  {
    path: 'booktickets/:id',
    canActivate: [AuthGuard],
    component: BookticketsComponent
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'history',
    canActivate: [AuthGuard],
    component: TicketHistoryComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
