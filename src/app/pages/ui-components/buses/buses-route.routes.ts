import { BusesGetAllComponent } from "./buses-get-all/buses-get-all.component";
import{BusesCreateComponent} from "./buses-create/buses-create.component";
import { Routes } from '@angular/router';



export const AuthenticationRoutes: Routes = [
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
    ],
  },
];
