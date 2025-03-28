import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { ClientLayoutComponent } from './layouts/Client/client-layout.component';
import { AuthenticationRoutes } from './pages/authentication/authentication.routes';
import { AppSideLoginComponent } from '../app/pages/authentication/side-login/side-login.component';
import { AppSideRegisterComponent } from '../app/pages/authentication/side-register/side-register.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/admin/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/ui-components/Admin/admin.routes').then(
            (m) => m.AdminRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },
  {
    path: 'auth',
    component: BlankComponent, 
    children: AuthenticationRoutes 
  },
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/ui-components/Client/client.routes').then(
            (m) => m.ClientRoutes
          ),
      }
    ],
  },
  ...AuthenticationRoutes,
  {
    path: '**',
    redirectTo: 'home',
  },
];
