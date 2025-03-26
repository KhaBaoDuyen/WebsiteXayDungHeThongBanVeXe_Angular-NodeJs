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


export const ClientRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  //  ...AuthenticationRoutes,
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
    path: 'booktickets',
    component: BookticketsComponent
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'history',
    component: TicketHistoryComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
