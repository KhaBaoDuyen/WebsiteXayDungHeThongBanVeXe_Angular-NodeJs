import { BusesGetAllComponent } from "./buses-get-all/buses-get-all.component";
import{BusesCreateComponent} from "./buses-create/buses-create.component";
import { BusesEditComponent } from "./buses-edit/buses-edit.component";
import { Routes } from '@angular/router';



export const busesRoutes: Routes = [
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
      {
        path: 'busesEdit/:id',
        component: BusesEditComponent,
      },
    ],
  },
];
