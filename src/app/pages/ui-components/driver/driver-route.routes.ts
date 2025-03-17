import { DriverGetAllComponent } from "./driver-get-all/driver-get-all.component";
import{DriverCreateComponent} from "./driver-create/driver-create.component";
import { Routes } from '@angular/router';



export const AuthenticationRoutes: Routes = [
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
    ],
  },
];
