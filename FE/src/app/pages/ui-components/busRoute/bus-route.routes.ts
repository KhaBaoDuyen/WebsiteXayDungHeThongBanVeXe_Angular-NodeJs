import { BusGetAllComponent } from "./bus-get-all/bus-get-all.component";
import{BusCreateComponent} from "./bus-create/bus-create.component";
import { BusEditComponent } from "./bus-edit/bus-edit.component";
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
      {
        path: 'busEdit/:id',
        component: BusEditComponent,
      },
    ],
  },
];
