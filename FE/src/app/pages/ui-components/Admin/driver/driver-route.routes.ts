import { DriverGetAllComponent } from "./driver-get-all/driver-get-all.component";
import{DriverCreateComponent} from "./driver-create/driver-create.component";
import { DriverEditComponent } from "./driver-edit/driver-edit.component";

import { Routes } from '@angular/router';


export const driverRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'driverGetAll',
        component: DriverGetAllComponent,
      },
      {
        path: 'driverAdd',
        component: DriverCreateComponent,
      },
      {
        path: 'driverEdit/:id',
        component: DriverEditComponent,
      },

    ],
  },
];
