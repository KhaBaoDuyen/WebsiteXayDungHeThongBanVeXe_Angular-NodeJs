import { BustypeGetAllComponent } from "./bustype-get-all/bustype-get-all.component";
import{BustypeCreateComponent} from "./bustype-create/bustype-create.component";
import { Routes } from '@angular/router';



export const busTypeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'busTypeGetAll',
        component: BustypeGetAllComponent,
      },
      {
        path: 'busTypeAdd',
        component: BustypeCreateComponent,
      },
    ],
  },
];
