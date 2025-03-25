import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { AuthenticationRoutes } from './authentication/authentication.routes';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter',
      urls: [
        { title: 'Dashboard', url: '/admin/dashboard' },
        { title: 'Starter' },
      ],
    },
    
  }
];
