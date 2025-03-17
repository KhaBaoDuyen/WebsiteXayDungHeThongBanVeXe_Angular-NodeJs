import { BusGetAllComponent } from "./bus-get-all/bus-get-all.component";
import{BusCreateComponent} from "./bus-create/bus-create.component";
import { Routes } from '@angular/router';


export const busRoutes: Routes = [
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
    ],
  },
];
