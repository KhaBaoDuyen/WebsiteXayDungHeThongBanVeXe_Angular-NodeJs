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
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminPayComponent } from './admin-pay/admin-pay.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'busGetAll',
        component: BusGetAllComponent,
      },
      {
        path: 'busAdd',
        component: BusCreateComponent,
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
      {
        path: 'admin-users',
        component: AdminUsersComponent,
      }, {
        path: 'admin-pay',
        component: AdminPayComponent,
      },
    ],
  },
];
