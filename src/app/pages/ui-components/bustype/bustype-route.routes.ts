import { BustypeGetAllComponent } from "./bustype-get-all/bustype-get-all.component";
import{BustypeCreateComponent} from "./bustype-create/bustype-create.component";
import { Routes } from '@angular/router';



export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'bustypeGetAll',
        component: BustypeGetAllComponent,
      },
      {
        path: 'bustypeAdd',
        component: BustypeCreateComponent,
      },
    ],
  },
];
